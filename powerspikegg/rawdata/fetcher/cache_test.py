#!/usr/bin/env python2

import gflags
import time
import unittest

from powerspikegg.rawdata.fetcher import cache
from powerspikegg.rawdata.fetcher import service_pb2
from powerspikegg.rawdata.public import constants_pb2
from powerspikegg.lib.mongodb import wrapper

"""Set of tests for the caching library."""

FLAGS = gflags.FLAGS


class CacheManagerTest(unittest.TestCase):
    """Tests the cache system send correct request to the server."""

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

    def test_match_find(self):
        """Test if insertion is correctly handled."""
        manager = cache.CacheManager(lazy_connection=True)
        match_id, region = 4242, constants_pb2.EUW

        manager.find_match(
            service_pb2.MatchRequest(id=match_id, region=region))

        matches = self.client[FLAGS.rawdata_cache_database_name].matches
        self.assertEquals(
            matches.find_one({"matchId": match_id, "region": region}).count,
            1,
            "Unexpected amount of matches matching the request.")

    # TODO(funkysayu) Do insertions tests once the framework author answers
    #                 questions about the API.


if __name__ == "__main__":
    unittest.main()
