import gflags
import mock
import unittest

from powerspikegg.computation_models.fetcher import fetcher
from powerspikegg.rawdata.public import match_pb2

FLAGS = gflags.FLAGS


class TestComputationFetcher(unittest.TestCase):
    """Tests the computation fetcher works correctly."""

    @classmethod
    def setUpClass(cls):
        """Parse flags"""
        FLAGS([])

    def test_end_to_end(self):
        """Tests the fetcher sanitize correctly the data."""
        match = match_pb2.MatchReference(detail=match_pb2.MatchDetail())
        losers = match.detail.teams.add(winner=False)
        winners = match.detail.teams.add(winner=True)
        winners.participants.add(statistics=match_pb2.PlayerStatistics(
            kills=1,
            deaths=2,
            assists=3,
            minions_killed=4,
            neutral_minions_killed=5,
            total_damages=match_pb2.DamageStatistic(
                total=6),
            total_heal=7,
            wards_placed=8,
            tower_kills=9,
        ))

        fetcher.ComputationFetcher.stub = mock.Mock()
        fetcher.ComputationFetcher.stub.CacheQuery.return_value = [match]

        result = fetcher.fetch_and_sanitize(10)
        list(result)


if __name__ == "__main__":
    unittest.main()
