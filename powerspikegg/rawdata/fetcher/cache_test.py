import gflags
import json
import mock
import random
import time
import traceback
import os
import unittest

from powerspikegg.rawdata.fetcher import cache
from powerspikegg.rawdata.fetcher import service_pb2
from powerspikegg.rawdata.public import constants_pb2
from powerspikegg.lib.mongodb import wrapper
from third_party.python.riotwatcher.rwmock import SAMPLES

"""Set of tests for the caching library."""

FLAGS = gflags.FLAGS


class CacheManagerTest(unittest.TestCase):
    """Tests the cache system send correct request to the server."""

    def setup_test_collection(self):
        """Utility function used to get the collection used in the current test

        Returns:
            The database used by the current test.
        """
        # This uses a Python trick to get the name of the test function in
        # which the call was made. We then use this as the database for our
        # collection.
        # This should normally go into the setUp method, but this method might
        # be run at the same time by two different test, and has no idea of how
        # to generate properly a unique identifier without doing a random.
        database_name = traceback.extract_stack(None, 2)[0][2]
        cache.CacheManager.database_name = database_name

        return self.client[database_name]

    @classmethod
    def setUpClass(cls):
        """Set up a fake mongodb server for testing purpose."""
        cls.server = wrapper.create_mongo_server()
        cache.CacheManager.address = cls.server.address
        cls.client = cls.server.client

        FLAGS([])

    @classmethod
    def tearDownClass(cls):
        """Stop the fake mongodb server."""
        cls.server.shutdown()

    def test_match_insertion(self):
        """Test if insertion is correctly handled."""
        collection = self.setup_test_collection().matches

        manager = cache.CacheManager()
        manager.save_match(SAMPLES["match"])

        # Check if the match is saved into the database.
        cursor = collection.find({
            "matchId": SAMPLES["match"]["matchId"],
            "region": SAMPLES["match"]["region"],
        })
        self.assertEquals(
            cursor.count(),
            1,
            "Unexpected amount of matches matching the request."
        )

    def test_find_match(self):
        """Tests if a match can be find from its ID from the database."""
        collection = self.setup_test_collection().matches

        # Insert a match into the database
        collection.insert_one(SAMPLES["match"])

        # Try to find this match
        manager = cache.CacheManager()
        match = manager.find_match(service_pb2.MatchRequest(
            id=SAMPLES["match"]["matchId"],
            region=constants_pb2.Region.Value(SAMPLES["match"]["region"])))

        self.assertEquals(match, SAMPLES["match"])

    def test_summoner_insertion(self):
        """Test if insertion of a summoner is correctly handled."""
        collection = self.setup_test_collection().summoners

        manager = cache.CacheManager()
        manager.save_summoner(SAMPLES["summoner"], constants_pb2.EUW)

        # Check if the summoner is saved into the database.
        cursor = collection.find({
            "name": SAMPLES["summoner"]["name"],
            "id": SAMPLES["summoner"]["id"],
            "region": constants_pb2.Region.Name(constants_pb2.EUW),
        })
        self.assertEquals(
            cursor.count(),
            1,
            "Unexpected amount of summoners matching the request."
        )

    def test_find_summoner(self):
        """Tests if a summoner can be find in several ways."""
        collection = self.setup_test_collection().summoners
        region = constants_pb2.EUW
        sample_with_region = dict(
            SAMPLES["summoner"], region=constants_pb2.Region.Name(region))
        collection.insert_one(sample_with_region)

        manager = cache.CacheManager()

        summoner = manager.find_summoner(constants_pb2.Summoner(
            id=SAMPLES["summoner"]["id"],
            region=region,
        ))
        self.assertEquals(summoner, sample_with_region)

        summoner = manager.find_summoner(constants_pb2.Summoner(
            name=SAMPLES["summoner"]["name"],
            region=region,
        ))
        self.assertEquals(summoner, sample_with_region)

        summoner = manager.find_summoner(constants_pb2.Summoner(
            name=SAMPLES["summoner"]["name"],
            id=SAMPLES["summoner"]["id"],
            region=region,
        ))
        self.assertEquals(summoner, sample_with_region)

    def test_cache_query_forwarded_to_aggregator(self):
        """Tests the cache query are forwarded to the aggregator."""
        manager = cache.CacheManager()

        manager.aggregator = mock.Mock()
        manager.aggregator.SearchMatchesMatchingQuery.return_value = (
            [SAMPLES["match"]])

        results = list(manager.query_matches_cache(service_pb2.Query()))
        self.assertEqual(results, [SAMPLES["match"]])
        self.assertTrue(manager.aggregator.SearchMatchesMatchingQuery.called)

if __name__ == "__main__":
    unittest.main()
