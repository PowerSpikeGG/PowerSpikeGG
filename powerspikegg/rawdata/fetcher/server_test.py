import grpc
import json
import mock
import os
import requests
import unittest

from riotwatcher import LoLException

from powerspikegg.rawdata.fetcher import service_pb2
from powerspikegg.rawdata.fetcher.converter import JSONConverter
from powerspikegg.rawdata.fetcher.server import MatchFetcher
from powerspikegg.rawdata.fetcher.server import start_server
from powerspikegg.rawdata.public import constants_pb2
from powerspikegg.rawdata.public import match_pb2


class MatchFetcherTest(unittest.TestCase):
    """Test the behavior of the MatchFetcher gRPC server."""

    MATCH_DATA = "match.json"

    @classmethod
    def setUpClass(cls):
        """Instantiate a server for tests"""
        cls.server, cls.service = start_server("123", 50001, 10)

        # Only initialize once the stub
        cls.channel = grpc.insecure_channel("localhost:50001")
        cls.stub = service_pb2.MatchFetcherStub(cls.channel)

    @classmethod
    def tearDownClass(cls):
        """Stop the server."""
        cls.server.stop(0)

    def setUp(self):
        """Generates a new magic mock in the handler for each tests."""
        self.service.riot_api_handler = mock.MagicMock()

    def test_server_standard_request(self):
        """Check if the server handle correctly a normal request."""
        # Forward sample data fetched from the Riot API directly as result
        this_dir = os.path.dirname(os.path.abspath(__file__))
        with open(os.sep.join([this_dir, "samples", self.MATCH_DATA])) as f:
            self.match_data = json.load(f)
        self.service.riot_api_handler.get_match.return_value = self.match_data

        response = self.stub.Match(service_pb2.MatchRequest(id=4242,
            region=constants_pb2.EUW))

        # Check the conversion of the sample is matching the response
        converter = JSONConverter(None)
        expected = converter.json_match_to_match_pb(self.match_data)
        self.assertEqual(response, expected)

    def test_match_not_found(self):
        """Check if the server send an empty match if not found."""
        self.service.riot_api_handler.get_match.side_effect = LoLException(
            "404", requests.Response())

        response = self.stub.Match(service_pb2.MatchRequest(id=4242,
            region=constants_pb2.EUW))
        self.assertEqual(response, match_pb2.MatchReference())

    def test_bad_request(self):
        """Check if the server correctly raise error on bad request."""
        with self.assertRaises(grpc.RpcError):
            self.stub.Match(service_pb2.MatchRequest(id=4242))
        with self.assertRaises(grpc.RpcError):
            self.stub.Match(service_pb2.MatchRequest())
        with self.assertRaises(grpc.RpcError):
            self.stub.Match(service_pb2.MatchRequest(region=constants_pb2.EUW))


if __name__ == "__main__":
    unittest.main()
