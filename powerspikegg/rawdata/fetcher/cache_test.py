import gflags
import json
import random
import time
import traceback
import os
import unittest

from powerspikegg.rawdata.fetcher import cache
from powerspikegg.rawdata.fetcher import service_pb2
from powerspikegg.rawdata.public import constants_pb2
from powerspikegg.lib.mongodb import wrapper

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

        return self.client[database_name].matches

    @classmethod
    def setUpClass(cls):
        """Set up a fake mongodb server for testing purpose."""
        cls.server = wrapper.create_mongo_server()
        cache.CacheManager.address = cls.server.address
        cls.client = cls.server.client

        # Read a match sample
        this_path = os.path.dirname(os.path.realpath(__file__))
        sample_path = os.sep.join([this_path, "samples", "match.json"])
        with open(sample_path) as f:
            cls.sample_match = json.load(f)

        FLAGS([])

    @classmethod
    def tearDownClass(cls):
        """Stop the fake mongodb server."""
        cls.server.shutdown()

    def test_match_insertion(self):
        """Test if insertion is correctly handled."""
        collection = self.setup_test_collection()

        manager = cache.CacheManager()
        manager.save_match(self.sample_match)

        # Check if the match is saved into the database.
        cursor = collection.find({
            "matchId": self.sample_match["matchId"],
            "region": self.sample_match["region"],
        })
        self.assertEquals(cursor.count(), 1,
            "Unexpected amount of matches matching the request.")

    def test_find_match(self):
        """Tests if a match can be find from its ID from the database."""
        collection = self.setup_test_collection()

        # Insert a match into the database
        collection.insert_one(self.sample_match)

        # Try to find this match
        manager = cache.CacheManager()
        match = manager.find_match(service_pb2.MatchRequest(
            id=self.sample_match["matchId"],
            region=constants_pb2.Region.Value(self.sample_match["region"])))

        self.assertEquals(match, self.sample_match)


if __name__ == "__main__":
    unittest.main()
