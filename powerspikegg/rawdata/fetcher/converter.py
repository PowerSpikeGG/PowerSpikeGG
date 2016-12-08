from functools import lru_cache

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

    @lru_cache()
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

    def _get_player_statistics(self, json_statistics):
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
            neutral_minions_killed_ennemy_jungle=
                json_statistics["neutralMinionsKilledEnemyJungle"],
            neutral_minions_killed_team_jungle=
                json_statistics["neutralMinionsKilledTeamJungle"],
            sight_wards_bought=json_statistics["sightWardsBoughtInGame"],
            vision_wards_bought=json_statistics["visionWardsBoughtInGame"],
            wards_placed=json_statistics["wardsPlaced"],
            wards_killed=json_statistics["wardsKilled"],
            double_kills=json_statistics["doubleKills"],
            triple_kills=json_statistics["tripleKills"],
            quadra_kills=json_statistics["quadraKills"],
            penta_kills=json_statistics["pentaKills"],
            unreal_kills=json_statistics["unrealKills"],
            killing_sprees=json_statistics["killingSprees"],
            largest_killing_spree=json_statistics["largestKillingSpree"],
            largest_multi_kill=json_statistics["largestMultiKill"],
            inhibitor_kills=json_statistics["inhibitorKills"],
            tower_kills=json_statistics["towerKills"],
            first_blood_assist=json_statistics["firstBloodAssist"],
            first_blood_kill=json_statistics["firstBloodKill"],
            first_inhibitor_kill=json_statistics["firstInhibitorKill"],
            first_tower_assist=json_statistics["firstTowerAssist"],
            first_tower_kill=json_statistics["firstTowerKill"],
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
        )

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
            )
            identities[identity["participantId"]] = summoner

        teams = {}
        for participant_json in json_entry["participants"]:
            stats = self._get_player_statistics(participant_json["stats"])

            participant = match_pb2.Participant(
                id=participant_json["participantId"],
                summoner=identities[participant_json["participantId"]],
                summoner_spell_1=self.game_constant.get_summoner_spell_by_id(
                    participant_json["spell1Id"]),
                summoner_spell_2=self.game_constant.get_summoner_spell_by_id(
                    participant_json["spell2Id"]),
                statistics=stats,
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
            first_baron=json_team["firstBaron"],
            first_dragon=json_team["firstDragon"],
            first_blood=json_team["firstBlood"],
            first_tower=json_team["firstTower"],
            first_inhibitor=json_team["firstInhibitor"],
            first_rift_herald=json_team["firstRiftHerald"],
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
            team.MergeFrom(self._get_team(team_json,
                participants_per_teams[team_json["teamId"]]))

        return detail

    def json_match_to_match_pb(self, json_entry):
        """Build a MatchReference protobuf from a JSON entry representing a match.

        This function is used to convert data recovered from the Riot API (or the
        Riot API project cache) to a comprehensive protocol buffer, used in all our
        stack.

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


# TODO(funkysayu) remove this
if __name__ == "__main__":
    import os
    this_dir = os.path.dirname(os.path.abspath(__file__))
    data = open(this_dir + "/samples/match.json").read()
    import json
    d = json.loads(data)
    converter = JSONConverter(None)
    print(converter.json_match_to_match_pb(d))
