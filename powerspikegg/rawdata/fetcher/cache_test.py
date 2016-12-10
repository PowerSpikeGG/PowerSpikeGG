#!/usr/bin/env python2

import gflags
import mockupdb
import time
import unittest

from powerspikegg.rawdata.fetcher import cache
from powerspikegg.rawdata.fetcher import service_pb2
from powerspikegg.rawdata.public import constants_pb2

"""Set of tests for the caching library."""

FLAGS = gflags.FLAGS


class CacheManagerTest(unittest.TestCase):
    """Tests the cache system send correct request to the server."""

    @classmethod
    def setUpClass(cls):
        """Set up a fake mongodb server for testing purpose."""
        cls.server = mockupdb.MockupDB()
        port = cls.server.run()
        cache.CacheManager.address = cls.server.uri

        # Auto respond the ismaster command.
        cls.server.autoresponds('ismaster')

        FLAGS([])

    @classmethod
    def tearDownClass(cls):
        """Stop the fake mongodb server."""
        cls.server.stop()

    def test_server_connection(self):
        """Test the cache manager achieve to connect to the server."""
        manager = cache.CacheManager(lazy_connection=True)
        self.assertEqual(manager.client.admin.command('ismaster'), {'ok': 1})

    def test_match_find(self):
        """Test if insertion is correctly handled."""
        manager = cache.CacheManager(lazy_connection=True)
        match_id, region = 4242, constants_pb2.EUW

        future = mockupdb.go(manager.find_match, service_pb2.MatchRequest(
            id=4242, region=region))

        # Assert received command matches expectations.
        self.server.receives(mockupdb.OpQuery({
            "matchId": match_id,
            "region": constants_pb2.Region.Name(region),
        })).sends()

        future()

    # TODO(funkysayu) Do insertions tests once the framework author answers
    #                 questions about the API.


if __name__ == "__main__":
    unittest.main()
