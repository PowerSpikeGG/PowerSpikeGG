""" Fetch matches from the Riot fetcher gRPC server

Fetch random sample from the Riot fetcher to train TensorFlow models

"""

import gflags
import grpc
import numpy

from powerspikegg.rawdata.fetcher import service_pb2
from powerspikegg.rawdata.public import constants_pb2


FLAGS = gflags.FLAGS

gflags.DEFINE_string("fetcher_address", "127.0.0.1:50001",
                     "Address of the fetcher.")


class ComputationFetcher:
    """Utility to fetch the matches."""

    stub = None

    def __init__(self, grpc_address):
        """Constructor. Instantiate a ComputationFetcher.

        Parameters:
            grpc_address rawdata fetcher gRPC server address
        """
        if self.stub is None:
            ComputationFetcher.stub = service_pb2.MatchFetcherStub(
                grpc.insecure_channel(grpc_address))

    def fetch_random_sample(self, sample_size, league=None):
        """Fetch a random sample from the rawdata fetcher cache.

        Parameters:
            sample_size: Number of matches to fetch.
            league: Optional restriction onto the league.
        """
        query = service_pb2.Query(
            sample_size=sample_size,
            randomize_sample=True)
        if league is not None:
            query.league = league

        return self.stub.CacheQuery(query)


def _map_stats(stats_pb):
    """Map the statistics to a dictionnary"""
    return [
        {"label": "kills", "value": stats_pb.kills},
        {"label": "deaths", "value": stats_pb.deaths},
        {"label": "assists", "value": stats_pb.assists},
        {"label": "minions_killed", "value": stats_pb.minions_killed},
        {"label": "neutral_minions_killed",
            "value": stats_pb.neutral_minions_killed},
        {"label": "total_damages.total",
            "value": stats_pb.total_damages.total},
        {"label": "total_heal", "value": stats_pb.total_heal},
        {"label": "wards_placed", "value": stats_pb.wards_placed},
        {"label": "tower_kills", "value": stats_pb.tower_kills},
    ]


def _prepare_data(labelled_stats):
    """Create a tensorflow friendly data structure.

    Returns:
        A list of labelled data, where all data contains their label (i.e.
        kills), the expected value and a numpy array of all other stats.
        Exemple:
            [{'label': 'kill', 'expected': 10, 'data': [1, 2, 3, ...]}, ...]
    """
    raw_stats = [s["value"] for s in labelled_stats]

    result = []
    for index, labelled_stat in enumerate(labelled_stats):
        result.append(dict(
            label=labelled_stat["label"],
            expected=raw_stats[index],
            data=numpy.array([v for i, v in enumerate(raw_stats)
                              if i != index])
        ))

    return result


def _sanitize_match(match_pb):
    """Returns a list of tensorflow friendly statistics per players."""
    teams = match_pb.detail.teams
    winners = teams[0] if teams[0].winner else teams[1]
    return [_prepare_data(_map_stats(p.statistics))
            for p in winners.participants]


def fetch_and_sanitize(sample_size):
    """Fetch and sanitize random matches.

    Returns:
        sample_size * 5 labelled statistics
    """
    fetcher = ComputationFetcher(FLAGS.fetcher_address)

    for match_pb in fetcher.fetch_random_sample(sample_size):
        for participant_stats in _sanitize_match(match_pb):
            for labelled_stats in participant_stats:
                yield labelled_stats
