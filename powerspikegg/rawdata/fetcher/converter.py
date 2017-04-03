from powerspikegg.rawdata.fetcher import service_pb2
from powerspikegg.rawdata.public import match_pb2
from powerspikegg.rawdata.public import constants_pb2
from powerspikegg.rawdata.lib.python import static

"""
Convert a match in JSON to the protocol buffer message associated.
"""


class ConstantSolver():
    """Helper class solving game constants and caching them.

    This is used to fetch game data such as summoner spells and solve them
    from their IDs.
    """

    def __init__(self, api_handler):
        """Constructor. Register the RiotAPIHandler for future use.

        Parameters:
            api_handler: the Riot API handler, managing connection to the Riot
                API. It is used to solve some game constants.
        """
        self.api_handler = api_handler

    def get_summoner_spell_by_id(self, spell_id):
        """Get a summoner spell from its ID.

        Parameters:
            spell_id: Spell ID as registered in the Riot API.
        Returns:
            A SummonerSpell message containing the ID and the name of the
            summoner spell.
        """
        # TODO(funkysayu) fetch the summoner spell name.
        return constants_pb2.SummonerSpell(id=spell_id)

    def get_champion_by_id(self, champion_id):
        """Get a champion from its ID.

        Parameters:
            champion_id: champion ID as registered in the Riot API.
        Returns:
            A Champion message containing the ID and the name of the champion.
        """
        # TODO(funkysayu): fetch the champion name.
        return constants_pb2.Champion(id=champion_id)


class JSONConverter():
    """Converts JSON data fetched from the Riot API to protocol buffer.

    Helper class automatically resolving data (such as summoner ID to Summoner
    entity).
    """

    def __init__(self, api_handler):
        """Constructor. Creates a game constant solver.

        Parameters:
            api_handler: the Riot API handler, managing connection to the Riot
                API. It is used to solve some game constants.
        """
        self.game_constant = ConstantSolver(api_handler)

    def convert_player_statistics(self, json_statistics):
        """Convert the JSON player statistics to a protocol buffer.

        Parameters:
            json_statistics: a JSON formated as the Riot API's ParticipantStats
                DTO [1].
        Returns:
            A PlayerStatistics protocol buffer generated from the JSON.
        Raises:
            KeyError: If the JSON is not formated as expected.

          [1] https://developer.riotgames.com/api/methods#!/1224/4756
        """
        return match_pb2.PlayerStatistics(
            kills=json_statistics["kills"],
            deaths=json_statistics["deaths"],
            assists=json_statistics["assists"],
            champion_level=json_statistics["champLevel"],
            total_heal=json_statistics["totalHeal"],
            largest_critical_strike=json_statistics["largestCriticalStrike"],
            gold_earned=json_statistics["goldEarned"],
            gold_spent=json_statistics["goldSpent"],
            minions_killed=json_statistics["minionsKilled"],
            neutral_minions_killed=json_statistics["neutralMinionsKilled"],
            neutral_minions_killed_ennemy_jungle=(
                json_statistics["neutralMinionsKilledEnemyJungle"]),
            neutral_minions_killed_team_jungle=(
                json_statistics["neutralMinionsKilledTeamJungle"]),
            sight_wards_bought=json_statistics["sightWardsBoughtInGame"],
            vision_wards_bought=json_statistics["visionWardsBoughtInGame"],
            wards_placed=json_statistics["wardsPlaced"],
            wards_killed=json_statistics["wardsKilled"],
            double_kills=json_statistics["doubleKills"],
            triple_kills=json_statistics["tripleKills"],
            quadra_kills=json_statistics["quadraKills"],
            penta_kills=json_statistics["pentaKills"],
            killing_sprees=json_statistics["killingSprees"],
            largest_killing_spree=json_statistics["largestKillingSpree"],
            largest_multi_kill=json_statistics["largestMultiKill"],
            inhibitor_kills=json_statistics["inhibitorKills"],
            tower_kills=json_statistics["towerKills"],
            total_crowd_control=json_statistics["totalTimeCrowdControlDealt"],
            total_units_healed=json_statistics["totalUnitsHealed"],
            magic_damages=match_pb2.DamageStatistic(
                total=json_statistics["magicDamageDealt"],
                to_champions=json_statistics["magicDamageDealtToChampions"],
                taken=json_statistics["magicDamageTaken"]),
            physical_damages=match_pb2.DamageStatistic(
                total=json_statistics["physicalDamageDealt"],
                to_champions=json_statistics["physicalDamageDealtToChampions"],
                taken=json_statistics["physicalDamageTaken"]),
            true_damages=match_pb2.DamageStatistic(
                total=json_statistics["trueDamageDealt"],
                to_champions=json_statistics["trueDamageDealtToChampions"],
                taken=json_statistics["trueDamageTaken"]),
            total_damages=match_pb2.DamageStatistic(
                total=json_statistics["totalDamageDealt"],
                to_champions=json_statistics["totalDamageDealtToChampions"],
                taken=json_statistics["totalDamageTaken"]),
            first_blood_assist=json_statistics.get("firstBloodAssist", False),
            first_blood_kill=json_statistics.get("firstBloodKill", False),
            first_inhibitor_kill=json_statistics.get(
                "firstInhibitorKill", False),
            first_tower_assist=json_statistics.get("firstTowerAssist", False),
            first_tower_kill=json_statistics.get("firstTowerKill", False),
        )
        # pylint: enable=line-too-long

    def _get_participants_per_team_ids(self, json_entry):
        """Build a list of Participant protobuf from a JSON entry.

        Parameters:
            json_entry: a JSON formated as the Riot API's MatchDetail DTO [1].
        Returns:
            A list of Participant message filled with the JSON data.
        Raises:
            KeyError: if a data is missing in the JSON entry.

          [1] https://developer.riotgames.com/api/methods#!/1224/4756
        """
        identities = {}
        for identity in json_entry["participantIdentities"]:
            summoner = constants_pb2.Summoner(
                id=identity["player"]["summonerId"],
                name=identity["player"]["summonerName"],
                region=constants_pb2.Region.Value(json_entry["region"]),
            )
            identities[identity["participantId"]] = summoner

        teams = {}
        for participant_json in json_entry["participants"]:
            stats = self.convert_player_statistics(participant_json["stats"])

            # TODO(funkysayu): The current assigned league is the highest
            # achieved league of the player. This should be the current league.
            summoner = identities[participant_json["participantId"]]
            summoner.league = constants_pb2.League.Value(
                participant_json["highestAchievedSeasonTier"])

            if participant_json["timeline"]["lane"] == "BOTTOM":
                if participant_json["timeline"]["role"] == "DUO_CARRY":
                    role = constants_pb2.ADCARRY
                else:
                    role = constants_pb2.SUPPORT
            else:
                role = constants_pb2.Role.Value(
                    participant_json["timeline"]["lane"])

            participant = match_pb2.Participant(
                id=participant_json["participantId"],
                summoner=summoner,
                summoner_spell_1=self.game_constant.get_summoner_spell_by_id(
                    participant_json["spell1Id"]),
                summoner_spell_2=self.game_constant.get_summoner_spell_by_id(
                    participant_json["spell2Id"]),
                statistics=stats,
                champion=self.game_constant.get_champion_by_id(
                    participant_json["championId"]),
                role=role,
            )

            teams.setdefault(participant_json["teamId"], []).append(
                participant)

        return teams

    def _get_team(self, json_team, participants):
        """Build a TeamDetail message from JSON entry representing a team.

        Parameters:
            json_team: a JSON formated as the Riot API's Team DTO [1].
            participants: list of Participant message, corresponding to players
                in the team.
        Returns:
            A TeamDetail message filled with the JSON data.
        Raises:
            KeyError: if a data is missing in the JSON entry.

          [1] https://developer.riotgames.com/api/methods#!/1224/4756
        """
        # TODO(funkysayu) add the list of bans
        return match_pb2.TeamDetail(
            id=json_team["teamId"],
            winner=json_team["winner"],
            baron_kills=json_team["baronKills"],
            dragon_kills=json_team["dragonKills"],
            tower_kills=json_team["towerKills"],
            first_baron=json_team.get("firstBaron", False),
            first_dragon=json_team.get("firstDragon", False),
            first_blood=json_team.get("firstBlood", False),
            first_tower=json_team.get("firstTower", False),
            first_inhibitor=json_team.get("firstInhibitor", False),
            first_rift_herald=json_team.get("firstRiftHerald", False),
            participants=participants,
        )

    def _get_detail(self, json_entry):
        """Build a MatchDetail protobuf from a JSON entry representing a match.

        Parameters:
            json_entry: a JSON formated as the Riot API's MatchDetail DTO [1].
        Returns:
            A MatchDetail message filled with the JSON data.
        Raises:
            KeyError: if a data is missing in the JSON entry.

          [1] https://developer.riotgames.com/api/methods#!/1224/4756
        """
        detail = match_pb2.MatchDetail(
            map=static.get_map_from_id(json_entry["mapId"]),
            duration=json_entry["matchDuration"],
            )

        participants_per_teams = self._get_participants_per_team_ids(
            json_entry)

        for team_json in json_entry["teams"]:
            team = detail.teams.add()
            team.MergeFrom(self._get_team(
                team_json, participants_per_teams[team_json["teamId"]]))

        return detail

    def json_match_to_match_pb(self, json_entry):
        """Build a MatchReference protobuf from a JSON entry representing a match.

        This function is used to convert data recovered from the Riot API (or
        the Riot API project cache) to a comprehensive protocol buffer, used in
        all our stack.

        Parameters:
            json_entry: a JSON formated as the Riot API's MatchDetail DTO [1].
        Returns:
            A MatchReference message filled with the JSON data.
        Raises:
            KeyError: if a data is missing in the JSON entry.
            ValueError: If some constants are not solvable (such as not
                supported queue type).

          [1] https://developer.riotgames.com/api/methods#!/1224/4756
        """
        return match_pb2.MatchReference(
            id=json_entry["matchId"],
            timestamp=json_entry["matchCreation"],
            version=json_entry["matchVersion"],
            plateform_id=json_entry["platformId"],
            region=constants_pb2.Region.Value(json_entry["region"]),
            queue_type=constants_pb2.QueueType.Value(json_entry["queueType"]),
            season=constants_pb2.Season.Value(json_entry["season"]),
            detail=self._get_detail(json_entry),
        )

    def json_summoner_to_summoner_pb(self, json_entry, region=None):
        """Build a Summoner protobuf from a JSON entry representing a summoner.

        Parameters:
            json_entry: a JSON formated as the Riot API's SummonerDto DTO [1].
            region: Region of the summoner. The caching system stores this
                variable in the JSON, but not the Riot API. This parameter is
                required if data are provided directly from the Riot API.
        Returns:
            A Summoner message filled with the JSON data.
        Raises:
            KeyError: if a data is missing in the JSON entry.

          [1] https://developer.riotgames.com/api/methods#!/1221/4746
        """
        if region is None:
            if "region" not in json_entry:
                raise KeyError("'region' parameter not specified, "
                               "and no region found in the JSON.")
            region = constants_pb2.Region.Value(json_entry["region"])

        return constants_pb2.Summoner(
            id=json_entry["id"],
            name=json_entry["name"],
            region=region,
        )

    def json_aggregation_to_aggregation_pb(self, json_entry):
        """Build an AggregatedStatistics message from a JSON entry.

        Parameters:
            json_entry: JSON returned by the aggregation workflow.
        Returns:
            An AggregatedStatistics message build from the JSON.
        """
        match_pool = json_entry.pop("total")
        return service_pb2.AggregatedStatistics(
            match_pool=match_pool,
            stats=self.convert_player_statistics(json_entry))
