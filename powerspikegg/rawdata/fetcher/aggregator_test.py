import json
import glob
import os
import unittest

from collections import deque

from powerspikegg.lib.mongodb import wrapper
from powerspikegg.rawdata.public import constants_pb2
from powerspikegg.rawdata.fetcher import aggregator
from powerspikegg.rawdata.fetcher import service_pb2


SAMPLE_AGGREGATED_DATA = {
    "total": 2,
    "assists": 6,
    "champLevel": 13,
    "deaths": 2,
    "doubleKills": 0,
    "goldEarned": 8195,
    "goldSpent": 7300,
    "inhibitorKills": 0,
    "killingSprees": 0,
    "kills": 1,
    "largestCriticalStrike": 0,
    "largestKillingSpree": 0,
    "largestMultiKill": 1,
    "magicDamageDealt": 55942,
    "magicDamageDealtToChampions": 6865,
    "magicDamageTaken": 6099,
    "minionsKilled": 165,
    "neutralMinionsKilled": 0,
    "neutralMinionsKilledEnemyJungle": 0,
    "neutralMinionsKilledTeamJungle": 0,
    "pentaKills": 0,
    "physicalDamageDealt": 23168,
    "physicalDamageDealtToChampions": 5802,
    "physicalDamageTaken": 4752,
    "quadraKills": 0,
    "sightWardsBoughtInGame": 0,
    "totalDamageDealt": 79151,
    "totalDamageDealtToChampions": 12667,
    "totalHeal": 462,
    "totalTimeCrowdControlDealt": 489,
    "totalUnitsHealed": 1,
    "towerKills": 0,
    "tripleKills": 0,
    "trueDamageDealt": 40,
    "trueDamageDealtToChampions": 0,
    "trueDamageTaken": 0,
    "visionWardsBoughtInGame": 2,
    "wardsKilled": 2,
    "wardsPlaced": 7,
    "totalScoreRank": 0,
    "totalDamageTaken": 10852,
}


class SearchTest(unittest.TestCase):
    """Set of tests checking if aggregator works correctly.

    Aggregator is a pretty sensitive function of the fetcher. We run multiple
    tests on it ensuring results are as expected.
    """

    @classmethod
    def setUpClass(cls):
        """Start a fake mongodb server fed with a set of matches."""
        cls.server = wrapper.create_mongo_server()
        cls.client = cls.server.client
        cls.collection = cls.client.test.matches  # Setup a test collection.

        # Feed the mongo server with a list of matches
        this_path = os.path.dirname(os.path.realpath(__file__))
        json_samples = glob.glob(os.sep.join([this_path, "samples", "*.json"]))
        for filepath in json_samples:
            with open(filepath) as f:
                cls.collection.insert_one(json.load(f))

    @classmethod
    def tearDownClass(cls):
        """Stop the fake mongodb server."""
        cls.server.shutdown()

    def test_summoner_filtering_only_name(self):
        """Tests matches where "Foo bar" played are selected."""
        query = service_pb2.Query(summoner=constants_pb2.Summoner(
            name="Foo bar"))

        generator = aggregator.SearchMatchesMatchingQuery(
            self.collection, query)
        self.assertEquals(len(deque(generator)), 2)

    def test_summoner_filtering_only_id(self):
        """Tests matches where summoner 1337 played are selected."""
        query = service_pb2.Query(summoner=constants_pb2.Summoner(
            id=1337))

        generator = aggregator.SearchMatchesMatchingQuery(
            self.collection, query)
        self.assertEquals(len(deque(generator)), 1)

    def test_summoner_filtering_both(self):
        """Tests matches where summoner Foo bar of id 4242 are selected."""
        query = service_pb2.Query(summoner=constants_pb2.Summoner(
            name="Foo bar", id=4242))

        generator = aggregator.SearchMatchesMatchingQuery(
            self.collection, query)
        self.assertEquals(len(deque(generator)), 2)

    def test_filtering_limited(self):
        """Tests the limit argument of the query is handled."""
        # This query, without the sample size, should return 2 elements.
        query = service_pb2.Query(
            summoner=constants_pb2.Summoner(name="Foo bar", id=4242),
            sample_size=1)

        generator = aggregator.SearchMatchesMatchingQuery(
            self.collection, query)
        self.assertEqual(len(deque(generator)), 1)

    def test_filtering_randomized(self):
        """Tests the limit and randomize arguments are handled."""
        # This query, without the sample size, should return 2 elements.
        query = service_pb2.Query(
            summoner=constants_pb2.Summoner(name="Foo bar", id=4242),
            sample_size=1,
            randomize_sample=True)

        # Pick a reference match
        generator = aggregator.SearchMatchesMatchingQuery(
            self.collection, query)
        matches = deque(generator)
        self.assertEqual(len(matches), 1)
        match_reference = matches[0]

        # We want to test that on 15 execution of the query, at least one
        # result is different. We can the safely assume the randomizer works.
        MAX_TRIES = 15
        for _ in range(MAX_TRIES):
            generator = aggregator.SearchMatchesMatchingQuery(
                self.collection, query)
            match = next(generator)

            if match != match_reference:
                return  # Test is a success.

        raise AssertionError(
            "After %s tries, the match are still the same." % MAX_TRIES)

    def test_summoner_filtering_both_invalid(self):
        """Tests search with invalid pair summoner id/name are empty."""
        query = service_pb2.Query(summoner=constants_pb2.Summoner(
            name="Invalid name", id=4242))

        generator = aggregator.SearchMatchesMatchingQuery(
            self.collection, query)
        self.assertEquals(len(deque(generator)), 0)

        query = service_pb2.Query(summoner=constants_pb2.Summoner(
            name="Foo bar", id=123456))  # Invalid ID

        generator = aggregator.SearchMatchesMatchingQuery(
            self.collection, query)
        self.assertEquals(len(deque(generator)), 0)

    def test_league_filtering(self):
        """Tests matches can be filtered by league."""
        query = service_pb2.Query(league=constants_pb2.BRONZE)

        generator = aggregator.SearchMatchesMatchingQuery(
            self.collection, query)
        self.assertEquals(len(deque(generator)), 2)

        query = service_pb2.Query(league=constants_pb2.GOLD)

        generator = aggregator.SearchMatchesMatchingQuery(
            self.collection, query)
        self.assertEquals(len(deque(generator)), 3)

    def test_champion_filtering(self):
        """Tests matches can be filtered by champions."""
        query = service_pb2.Query(champion=constants_pb2.Champion(id=123))

        generator = aggregator.SearchMatchesMatchingQuery(
            self.collection, query)
        self.assertEquals(len(deque(generator)), 2)

    def test_invalid_champion_filtering(self):
        """Tests that if champion id is unspecified, exception is raised."""
        query = service_pb2.Query(champion=constants_pb2.Champion(name="foo"))

        with self.assertRaises(ValueError):
            generator = aggregator.SearchMatchesMatchingQuery(
                self.collection, query)
            deque(generator)

    def test_champion_and_league_filtering(self):
        """Tests that champion and league can be filtered both together."""
        query = service_pb2.Query(
            champion=constants_pb2.Champion(id=123),
            league=constants_pb2.PLATINUM
        )

        generator = aggregator.SearchMatchesMatchingQuery(
            self.collection, query)
        self.assertEquals(len(deque(generator)), 1)

    def test_avg_empty_query_should_fail(self):
        """Test that an empty query should fail on the average aggregator."""
        with self.assertRaises(AssertionError):
            aggregator.AverageStatisticsOnQuery(
                self.collection, service_pb2.Query())

    def assertDictEqualWithDebug(self, actual, expected):
        """Fails and give debug informations if dictionaries are not equals."""
        for i, key in enumerate(expected):
            self.assertIn(key, actual,
                          "Key '%s' (%s/%s) is missing in the actual." % (
                              key, i, len(expected)))
            self.assertEqual(actual[key], expected[key],
                             "(%s/%s) actual[%s]: %s != expected[%s]: %s" % (
                                 (i, len(expected), key, actual[key],
                                  key, expected[key])))

    def test_avg_league_filtering(self):
        """Tests that average based on league gives expected data.

        In this test, we ensure the database is correctly doing the
        aggregation. To ensure this, we reproduce the result by hard-coding
        it instead of doing a new request."""
        # 2 occurences in match sample 3 and 1
        query = service_pb2.Query(league=constants_pb2.BRONZE)

        expected = {
            "total": 2,
            "assists": 4.5,
            "champLevel": 12.5,
            "deaths": 2,
            "doubleKills": 1,
            "goldEarned": 8200,
            "goldSpent": 7300,
            "inhibitorKills": 0,
            "killingSprees": 0,
            "kills": 2,
            "largestCriticalStrike": 0,
            "largestKillingSpree": 0,
            "largestMultiKill": 1,
            "magicDamageDealt": 55942,
            "magicDamageDealtToChampions": 6865,
            "magicDamageTaken": 6099,
            "minionsKilled": 165,
            "neutralMinionsKilled": 0,
            "neutralMinionsKilledEnemyJungle": 0,
            "neutralMinionsKilledTeamJungle": 0,
            "pentaKills": 0,
            "physicalDamageDealt": 23168,
            "physicalDamageDealtToChampions": 5802,
            "physicalDamageTaken": 4752,
            "quadraKills": 0,
            "sightWardsBoughtInGame": 0,
            "totalDamageDealt": 79151,
            "totalDamageDealtToChampions": 12667,
            "totalHeal": 462,
            "totalTimeCrowdControlDealt": 489,
            "totalUnitsHealed": 1,
            "towerKills": 0,
            "tripleKills": 0,
            "trueDamageDealt": 40,
            "trueDamageDealtToChampions": 0,
            "trueDamageTaken": 0,
            "visionWardsBoughtInGame": 2,
            "wardsKilled": 2,
            "wardsPlaced": 7,
            "totalScoreRank": 0,
            "totalDamageTaken": 10852,
        }
        result = aggregator.AverageStatisticsOnQuery(self.collection, query)
        self.assertDictEqualWithDebug(result, expected)

    def test_avg_champion_filtering(self):
        """Tests filter per champion on the average aggregation."""
        # 1 occurence in sample 1
        query = service_pb2.Query(champion=constants_pb2.Champion(id=55))

        expected = {
            "total": 1,
            "assists": 3,
            "champLevel": 12,
            "deaths": 2,
            "doubleKills": 2,
            "goldEarned": 8205,
            "goldSpent": 7300,
            "inhibitorKills": 0,
            "killingSprees": 0,
            "kills": 3,
            "largestCriticalStrike": 0,
            "largestKillingSpree": 0,
            "largestMultiKill": 1,
            "magicDamageDealt": 55942,
            "magicDamageDealtToChampions": 6865,
            "magicDamageTaken": 6099,
            "minionsKilled": 165,
            "neutralMinionsKilled": 0,
            "neutralMinionsKilledEnemyJungle": 0,
            "neutralMinionsKilledTeamJungle": 0,
            "pentaKills": 0,
            "physicalDamageDealt": 23168,
            "physicalDamageDealtToChampions": 5802,
            "physicalDamageTaken": 4752,
            "quadraKills": 0,
            "sightWardsBoughtInGame": 0,
            "totalDamageDealt": 79151,
            "totalDamageDealtToChampions": 12667,
            "totalHeal": 462,
            "totalTimeCrowdControlDealt": 489,
            "totalUnitsHealed": 1,
            "towerKills": 0,
            "tripleKills": 0,
            "trueDamageDealt": 40,
            "trueDamageDealtToChampions": 0,
            "trueDamageTaken": 0,
            "visionWardsBoughtInGame": 2,
            "wardsKilled": 2,
            "wardsPlaced": 7,
            "totalScoreRank": 0,
            "totalDamageTaken": 10852,
        }
        result = aggregator.AverageStatisticsOnQuery(self.collection, query)
        self.assertDictEqualWithDebug(result, expected)

    def test_avg_league_and_champions_filtering(self):
        """Tests filter per champion and league on the average aggregation."""
        # 2 occurences in samples 1 and 2
        query = service_pb2.Query(
            league=constants_pb2.PLATINUM,
            champion=constants_pb2.Champion(id=122)
        )

        expected = {
            "total": 2,
            "assists": 6,
            "champLevel": 13,
            "deaths": 2,
            "doubleKills": 0,
            "goldEarned": 8195,
            "goldSpent": 7300,
            "inhibitorKills": 0,
            "killingSprees": 0,
            "kills": 1,
            "largestCriticalStrike": 0,
            "largestKillingSpree": 0,
            "largestMultiKill": 1,
            "magicDamageDealt": 55942,
            "magicDamageDealtToChampions": 6865,
            "magicDamageTaken": 6099,
            "minionsKilled": 165,
            "neutralMinionsKilled": 0,
            "neutralMinionsKilledEnemyJungle": 0,
            "neutralMinionsKilledTeamJungle": 0,
            "pentaKills": 0,
            "physicalDamageDealt": 23168,
            "physicalDamageDealtToChampions": 5802,
            "physicalDamageTaken": 4752,
            "quadraKills": 0,
            "sightWardsBoughtInGame": 0,
            "totalDamageDealt": 79151,
            "totalDamageDealtToChampions": 12667,
            "totalHeal": 462,
            "totalTimeCrowdControlDealt": 489,
            "totalUnitsHealed": 1,
            "towerKills": 0,
            "tripleKills": 0,
            "trueDamageDealt": 40,
            "trueDamageDealtToChampions": 0,
            "trueDamageTaken": 0,
            "visionWardsBoughtInGame": 2,
            "wardsKilled": 2,
            "wardsPlaced": 7,
            "totalScoreRank": 0,
            "totalDamageTaken": 10852,
        }
        result = aggregator.AverageStatisticsOnQuery(self.collection, query)
        self.assertDictEqualWithDebug(result, expected)

    def test_avg_sample_limitation(self):
        """Tests the sample size limitation is correctly handled."""
        # This query, without the sample size, should return 2 elements.
        query = service_pb2.Query(
            league=constants_pb2.PLATINUM,
            champion=constants_pb2.Champion(id=122),
            sample_size=1)

        result = aggregator.AverageStatisticsOnQuery(self.collection, query)
        self.assertEqual(result["total"], 1)

    def test_avg_sample_randomization(self):
        """Tests randomization of a sample is correctly handled."""
        # This query, without the sample size, should return 2 elements.
        query = service_pb2.Query(
            league=constants_pb2.BRONZE,
            sample_size=1,
            randomize_sample=True)

        reference = aggregator.AverageStatisticsOnQuery(self.collection, query)
        self.assertEqual(reference["total"], 1)

        # We want to test that on 15 execution of the query, at least one
        # result is different. We can the safely assume the randomizer works.
        MAX_TRIES = 15
        for _ in range(MAX_TRIES):
            result = aggregator.AverageStatisticsOnQuery(
                self.collection, query)

            if result != reference:
                return  # Test is a success

        raise AssertionError(
            "After %s tries, the results are still the same." % MAX_TRIES)


if __name__ == "__main__":
    unittest.main()
