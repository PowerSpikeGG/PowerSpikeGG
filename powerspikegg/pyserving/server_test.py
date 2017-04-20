import grpc
import gflags
import mock
import unittest

from powerspikegg.serving.public import match_computation_pb2 as mc_pb2
from powerspikegg.rawdata.fetcher import converter
from powerspikegg.rawdata.public import constants_pb2
from powerspikegg.rawdata.public import match_pb2
from powerspikegg.pyserving import server
from third_party.python.riotwatcher.rwmock import SAMPLES


class MatchComputationTest(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        gflags.FLAGS([])
        m = converter.JSONConverter.game_constant = mock.Mock()
        m.get_champion_by_id.return_value = constants_pb2.Champion(id=2)
        m.get_summoner_spell_by_id.return_value = constants_pb2.SummonerSpell(
            id=2)
        cls.converter = converter.JSONConverter(None)

        cls.server, cls.service = server.start_server(50040, 10)
        cls.channel = grpc.insecure_channel("localhost:50040")
        cls.stub = mc_pb2.MatchComputationStub(cls.channel)

    @classmethod
    def tearDownClass(cls):
        cls.server.stop(0)

    def test_serving_end_to_end(self):
        expected = self.converter.json_match_to_match_pb(SAMPLES["match"])

        result = self.stub.GetFeature(mc_pb2.MatchComputationRequest(
            model_name="foo",
            match=expected,
            summoner_id=64369286,
        ))
        print(result)


if __name__ == "__main__":
    unittest.main()
