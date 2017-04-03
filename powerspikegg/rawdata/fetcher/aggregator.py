import logging

from powerspikegg.rawdata.public import constants_pb2

"""MongoDB aggregator used to search elements in the MongoDB database.

Uses the collection aggregator to fetch matches matching a query sent by the
user.

IMPORTANT NOTE: This package is sensible to the Riot API format. It may not be
backward compatible with matches fetched with an older version of the Riot API.

This module first use mongo filters, allowing faster processing but not
filtering every requirements. For example, filtering by summoner name and
league is not possible using mongo db aggregators NOT modifiying the data
(which is necessary in our case).
We then ensure all the requirements are matched with some post processing on
the data.
"""


def _create_sampling_request(query_pb):
    """Creates a request to retrieve only a sample of the result."""
    if query_pb.randomize_sample:
        return {"$sample": {"size": query_pb.sample_size}}
    return {"$limit": query_pb.sample_size}


def _mongo_filter_by_summoner(initial_query, summoner_pb):
    """Create a filter for the aggregation pipeline based on a summoner.

    Parameters:
        summoner_pb: Protocol buffer containing summoner information.
    Returns:
        A Mongo DB filter, filtering matches where the player was present.
    """
    entity_filter = {}
    if summoner_pb.name:
        entity_filter["player.summonerName"] = summoner_pb.name
    if summoner_pb.id:
        entity_filter["player.summonerId"] = summoner_pb.id

    initial_query.update({'participantIdentities': {
        '$elemMatch': entity_filter}})
    return initial_query


def _create_mongo_filters(query_pb):
    """Create simple mongo filters returning matches matching the query.

    Note that this is a pre-processing of the data that does not aggregate the
    results (in order to avoid modifying them). Some post processing are
    required to ensure the data is perfectly matching the query.

    For example, for the following query:
        champion: <
            name: Lucian
        >
        summoner: <
            name: Foo bar
        >
    we cannot ensure returned matches are those where "Foo bar" played Lucian
    without post-processing. We can only ensure a Lucian was present in the
    game and "Foo bar" too.

    Parameters:
        query_pb: Protocol buffer containing participant filters.
    Returns:
        A Mongo DB filter, filtering matches matching the participant filters.
    """
    query = {}
    if query_pb.summoner is not None:
        _mongo_filter_by_summoner(query, query_pb.summoner)

    matcher = {}
    if query_pb.league is not constants_pb2.UNDEFINED:
        matcher["highestAchievedSeasonTier"] = constants_pb2.League.Name(
            query_pb.league).upper()
    if query_pb.HasField("champion"):
        if not query_pb.champion.id:
            raise ValueError("Required champion id is unspecified.")
        matcher["championId"] = query_pb.champion.id

    if matcher:
        query["participants"] = {"$elemMatch": matcher}

    return query


def SearchMatchesMatchingQuery(collection, query_pb):
    """Converts a Query message to a MongoDB aggregation pipeline.

    This function creates Mongo DB filters matching the query and apply
    additional filters if required (see _create_mongo_filters).

    Parameters:
        collection: MongoDB collection on which the request will be executed.
        query_pb: Query message containing the requirements a returned match
            must have.
    Returns:
        A generator looking for matches matching the Query requirements.
    """
    mongo_query = []

    filters = _create_mongo_filters(query_pb)
    if filters:
        mongo_query.append({"$match": filters})
    if query_pb.sample_size:
        mongo_query.append(_create_sampling_request(query_pb))
    cursor = collection.aggregate(mongo_query)

    # We must post process the data if and only if summoner is specified with
    # something else (e.g. league and champion). To avoid post processing for
    # nothing, we just yield from the cursor if this condition is unmatch.
    has_summoner = query_pb.summoner is None
    if has_summoner ^ any((query_pb.league, query_pb.champion)):
        for match in cursor:
            yield match
        return

    # We do not support query by summoner and league + champions for now.
    raise NotImplementedError()


# List of player statistics that can be aggregated to their average.
SUPPORTED_AVERAGE_STATS = [
    "assists",
    "champLevel",
    "deaths",
    "doubleKills",
    "goldEarned",
    "goldSpent",
    "inhibitorKills",
    "killingSprees",
    "kills",
    "largestCriticalStrike",
    "largestKillingSpree",
    "largestMultiKill",
    "magicDamageDealt",
    "magicDamageDealtToChampions",
    "magicDamageTaken",
    "minionsKilled",
    "neutralMinionsKilled",
    "neutralMinionsKilledEnemyJungle",
    "neutralMinionsKilledTeamJungle",
    "pentaKills",
    "physicalDamageDealt",
    "physicalDamageDealtToChampions",
    "physicalDamageTaken",
    "quadraKills",
    "sightWardsBoughtInGame",
    "totalDamageDealt",
    "totalDamageDealtToChampions",
    "totalHeal",
    "totalTimeCrowdControlDealt",
    "totalUnitsHealed",
    "towerKills",
    "tripleKills",
    "trueDamageDealt",
    "trueDamageDealtToChampions",
    "trueDamageTaken",
    "visionWardsBoughtInGame",
    "wardsKilled",
    "wardsPlaced",
    "totalScoreRank",
    "totalDamageTaken",
]


def _create_average_query():
    """Creates pipeline group operation to aggregate the player statistics.

    Returns:
        A dictionnary, containing the group operation to average the
        player statistics.
    """
    result = {
        "_id": None,
        "total": {"$sum": 1},
    }

    for stat_name in SUPPORTED_AVERAGE_STATS:
        result[stat_name] = {"$avg": "$participants.stats.%s" % stat_name}

    return {"$group": result}


def AverageStatisticsOnQuery(collection, query_pb):
    """Returns an average statistics based on a query semantic.

    Parameters:
        collection: MongoDB collection on which the request will be executed.
        query_pb: Query message containing the requirements a returned match
            must have.
    Returns:
        An average statistics of the player.
    """
    matcher = {}
    if query_pb.league:
        matcher["participants.highestAchievedSeasonTier"] = (
            constants_pb2.League.Name(query_pb.league))
    if query_pb.HasField("champion"):
        if not query_pb.champion.id:
            raise ValueError("Required champion id is unspecified.")
        matcher["participants.championId"] = query_pb.champion.id

    query = [
        {"$match": {"region": "EUW"}},  # TODO(funkysayu)
        {"$unwind": "$participants"},
        {"$match": matcher},
    ]
    if query_pb.sample_size:
        query.append(_create_sampling_request(query_pb))
    query.append(_create_average_query())

    result = next(collection.aggregate(query))
    result.pop("_id")  # Remove generated field by the grouping
    return result
