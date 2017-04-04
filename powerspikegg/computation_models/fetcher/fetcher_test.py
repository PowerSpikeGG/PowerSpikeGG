import gflags
import mock
import numpy
import unittest

from powerspikegg.computation_models.fetcher import fetcher
from powerspikegg.rawdata.public import constants_pb2
from powerspikegg.rawdata.public import match_pb2

FLAGS = gflags.FLAGS


def _create_mock_match():
    """Creates a mocked match."""
    match = match_pb2.MatchReference(detail=match_pb2.MatchDetail())
    losers = match.detail.teams.add(winner=False)
    winners = match.detail.teams.add(winner=True)

    for index in range(5):
        losers.participants.add(statistics=match_pb2.PlayerStatistics())

        player_stats = match_pb2.PlayerStatistics(
            kills=index,
            deaths=1+index,
            assists=2+index,
            minions_killed=3+index,
            neutral_minions_killed=4+index,
            total_damages=match_pb2.DamageStatistic(
                total=5+index),
            total_heal=6+index,
            wards_placed=7+index,
            tower_kills=8+index,
        )
        winners.participants.add(
            champion=constants_pb2.Champion(id=index + 1),
            summoner=constants_pb2.Summoner(league=index),
            statistics=player_stats,
        )

    return match


labels = ["kills", "deaths", "assists", "minions_killed",
          "neutral_minions_killed", "total_damages",
          "total_heal", "wards_placed", "tower_kills"]


class TestComputationFetcher(unittest.TestCase):
    """Tests the computation fetcher works correctly."""

    @classmethod
    def setUpClass(cls):
        """Parse flags"""
        cls.flags = fetcher.FLAGS = mock.Mock()

    def setUp(self):
        self.flags.fetcher_address = ""
        self.flags.restrict_league = None
        self.flags.restrict_champion = 0

    def test_end_to_end(self):
        """Tests the fetcher sanitize correctly the data."""
        match_pb = _create_mock_match()
        fetcher.ComputationFetcher.stub = mock.Mock()
        fetcher.ComputationFetcher.stub.CacheQuery.return_value = [match_pb]

        def generate(index):
            result = []
            for label_index, label in enumerate(labels):
                result.append(dict(
                    label=label,
                    expected=index + label_index,
                    data=[i + index for i in range(len(labels))
                          if i != label_index]))
            return result

        results = fetcher.fetch_and_sanitize(10)
        expected = [g for i in range(5) for g in generate(i)]
        self.assertEqual(len(expected), len(list(results)))

        for result, expect in zip(results, expected):
            self.assertEqual(result["label"], expect["label"])
            self.assertEqual(result["expected"], expect["expected"])
            self.assertEqual(len(result["data"]), len(expect["data"]))
            self.assertTrue(all(result["data"][i] == expect["data"][i]
                                for i in range(len(result["data"]))))

    def test_champion_filtering(self):
        """Tests the champion filtering works correctly."""
        self.flags.restrict_champion = 2

        match_pb = _create_mock_match()
        fetcher.ComputationFetcher.stub = mock.Mock()
        fetcher.ComputationFetcher.stub.CacheQuery.return_value = [match_pb]

        results = fetcher.fetch_and_sanitize(10)
        self.assertEqual(len(list(results)), len(labels))

    def test_league_filtering(self):
        """Tests the league filtering works correctly."""
        self.flags.restrict_league = constants_pb2.League.Name(
            constants_pb2.GOLD)

        match_pb = _create_mock_match()
        fetcher.ComputationFetcher.stub = mock.Mock()
        fetcher.ComputationFetcher.stub.CacheQuery.return_value = [match_pb]

        results = fetcher.fetch_and_sanitize(10)
        self.assertEqual(len(list(results)), len(labels))


if __name__ == "__main__":
    unittest.main()
