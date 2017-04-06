import grpc
import json
import mock
import os
import requests
import unittest

from powerspikegg.rawdata.fetcher import aggregator_test
from powerspikegg.rawdata.fetcher import converter
from powerspikegg.rawdata.fetcher import service_pb2
from powerspikegg.rawdata.fetcher.converter import JSONConverter
from powerspikegg.rawdata.fetcher.server import MatchFetcher
from powerspikegg.rawdata.fetcher.server import start_server
from powerspikegg.rawdata.public import constants_pb2
from powerspikegg.rawdata.public import match_pb2
from third_party.python.riotwatcher import riotwatcher
from third_party.python.riotwatcher.rwmock import RiotWatcherMock
from third_party.python.riotwatcher.rwmock import SAMPLES


class MatchFetcherTest(unittest.TestCase):
    """Test the behavior of the MatchFetcher gRPC server."""

    @classmethod
    def setUpClass(cls):
        """Instantiate a server for tests"""
        # Avoid setting up a Riot API handler and a cache system
        MatchFetcher.riot_api_handler = RiotWatcherMock()
        MatchFetcher.cache_manager = mock.MagicMock()

        m = converter.JSONConverter.game_constant = mock.Mock()
        m.get_summoner_spell_by_id.return_value = constants_pb2.SummonerSpell(
            id=1)
        m.get_champion_by_id.return_value = constants_pb2.Champion(id=4242)
        cls.converter = converter.JSONConverter(None)

        cls.server, cls.service = start_server("123", 50002, 10)

        # Only initialize once the stub
        cls.channel = grpc.insecure_channel("localhost:50002")
        cls.stub = service_pb2.MatchFetcherStub(cls.channel)

    @classmethod
    def tearDownClass(cls):
        """Stop the server."""
        cls.server.stop(0)

    def setUp(self):
        """Generates a new magic mock in the handler for each tests."""
        self.service.riot_api_handler = RiotWatcherMock()
        self.service.cache_manager = mock.MagicMock()

    def test_match_fetching(self):
        """Check if the server handle correctly a normal request."""
        # Setup mocks
        self.service.cache_manager.find_match.return_value = None

        response = self.stub.Match(service_pb2.MatchRequest(
            id=4242, region=constants_pb2.EUW))

        # Check the conversion of the sample is matching the response
        expected = self.converter.json_match_to_match_pb(SAMPLES["match"])
        self.assertEqual(response, expected)
        self.assertTrue(self.service.cache_manager.save_match.called)

    def test_match_from_cache(self):
        """Check if the server returns a match from the cache."""
        # Setup mocks
        self.service.cache_manager.find_match.return_value = SAMPLES["match"]

        response = self.stub.Match(service_pb2.MatchRequest(
            id=4242, region=constants_pb2.EUW))

        # Check the conversion of the sample is matching the response
        self.assertTrue(self.service.cache_manager.find_match.called)
        self.assertFalse(self.service.riot_api_handler.get_match.called)
        self.assertFalse(self.service.cache_manager.save_match.called)

    def test_match_not_found(self):
        """Check if the server send an empty match if not found."""
        self.service.cache_manager.find_match.return_value = None
        self.service.riot_api_handler.get_match.side_effect = (
            riotwatcher.LoLException("404", requests.Response()))

        response = self.stub.Match(service_pb2.MatchRequest(
            id=4242, region=constants_pb2.EUW))
        self.assertEqual(response, match_pb2.MatchReference())

    def test_bad_requests(self):
        """Check if the server correctly raise error on bad request."""
        # Match endpoint
        with self.assertRaises(grpc.RpcError):
            self.stub.Match(service_pb2.MatchRequest(id=4242))
        with self.assertRaises(grpc.RpcError):
            self.stub.Match(service_pb2.MatchRequest())
        with self.assertRaises(grpc.RpcError):
            self.stub.Match(service_pb2.MatchRequest(region=constants_pb2.EUW))

        # UpdateSummoner endpoint
        # Note we need to iterate to raise the grpc error.
        with self.assertRaises(grpc.RpcError):
            next(self.stub.UpdateSummoner(constants_pb2.Summoner(id=123)))
        with self.assertRaises(grpc.RpcError):
            next(self.stub.UpdateSummoner(constants_pb2.Summoner(name="foo")))
        with self.assertRaises(grpc.RpcError):
            next(self.stub.UpdateSummoner(constants_pb2.Summoner(
                region=constants_pb2.EUW)))

    def test_update_summoner_from_id(self):
        """Test the summoner update query correctly the summoners."""
        self.service.cache_manager.find_match.return_value = None

        responses = self.stub.UpdateSummoner(constants_pb2.Summoner(
            id=4242, region=constants_pb2.EUW))

        expected = self.converter.json_match_to_match_pb(SAMPLES["match"])
        for response in responses:
            self.assertEqual(response, expected)
        self.assertTrue(self.service.cache_manager.save_match.called)

    def test_update_summoner_by_name(self):
        """Ensures we can fetch last matches from a summoner name"""
        self.service.cache_manager.find_match.return_value = None
        self.service.cache_manager.find_summoner.return_value = None

        responses = self.stub.UpdateSummoner(constants_pb2.Summoner(
            name="Foo Bar", region=constants_pb2.EUW))

        expected = self.converter.json_match_to_match_pb(SAMPLES["match"])
        for response in responses:
            self.assertEqual(response, expected)
        self.assertTrue(self.service.cache_manager.save_match.called)
        self.assertTrue(self.service.riot_api_handler.get_summoner.called)
        self.assertTrue(self.service.cache_manager.save_summoner.called)

    def test_update_summoner_by_name_with_cache(self):
        """Ensures summoners are stored correctly"""
        self.service.cache_manager.find_match.return_value = None
        region = constants_pb2.EUW

        self.service.cache_manager.find_summoner.return_value = dict(
            SAMPLES["summoner"], region=constants_pb2.Region.Name(region))
        responses = self.stub.UpdateSummoner(constants_pb2.Summoner(
            name="Foo Bar", region=region))

        expected = self.converter.json_match_to_match_pb(SAMPLES["match"])
        for response in responses:
            self.assertEqual(response, expected)
        self.assertTrue(self.service.cache_manager.save_match.called)
        self.assertFalse(self.service.riot_api_handler.get_summoner.called)
        self.assertFalse(self.service.cache_manager.save_summoner.called)

    def test_query_cache_correctly_forwarded(self):
        """Ensure query is correctly forwarded."""
        expected = [SAMPLES["match"]]
        self.service.cache_manager.query_matches_cache.return_value = expected

        query = service_pb2.Query(summoner=constants_pb2.Summoner(name="foo"))
        responses = self.stub.CacheQuery(query)
        for response, expected_response in zip(responses, expected):
            self.assertEqual(response, self.converter.json_match_to_match_pb(
                expected_response))

        self.assertTrue(self.service.cache_manager.query_matches_cache.called)

    def test_aggregation_endpoint(self):
        """Tests data returned by the aggregator are converted and sent."""
        expected = aggregator_test.SAMPLE_AGGREGATED_DATA
        self.service.cache_manager.average_stats.return_value = expected.copy()

        query = service_pb2.Query(league=constants_pb2.BRONZE)
        response = self.stub.AverageStatistics(query)

        self.assertEqual(
            response,
            self.converter.json_aggregation_to_aggregation_pb(expected))


if __name__ == "__main__":
    unittest.main()
