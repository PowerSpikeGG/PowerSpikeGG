""" Fetch matches from the Riot fetcher gRPC server

Fetch random sample from the Riot fetcher to train TensorFlow models

"""
import grpc
import numpy

from powerspikegg.rawdata.fetcher import service_pb2
from powerspikegg.rawdata.public import constants_pb2


# TODO(ArchangelX360): DO TESTS
class ComputationFetcher:
    channel = None
    stub = None

    def __init__(self, grpc_address):
        """Constructor. Instantiate a ComputationFetcher.

        Parameters:
            grpc_address rawdata fetcher gRPC server address
        """
        self.channel = grpc.insecure_channel(grpc_address)
        self.stub = service_pb2.MatchFetcherStub(self.channel)

    def fetch_random_sample(self, summoner_id, region, sample_size):
        query = service_pb2.Query(
            summoner=constants_pb2.Summoner(
                id=summoner_id, region=region),
            sample_size=sample_size,
            randomize_sample=True)
        sample = self.stub.CacheQuery(query)
        return sample


class ComputationSanitizer:

    @staticmethod
    def map_stats(stats):
        return [
            {
                "label": "kills",
                "value": stats.kills
            },
            {
                "label": "deaths",
                "value": stats.deaths
            },
            {
                "label": "assists",
                "value": stats.assists
            },
            {
                "label": "minions_killed",
                "value": stats.minions_killed},
            {
                "label": "neutral_minions_killed",
                "value": stats.neutral_minions_killed
            },
            {
                "label": "total_damages.total",
                "value": stats.total_damages.total
            },
            {
                "label": "total_heal",
                "value": stats.total_heal
            },
            {
                "label": "wards_placed",
                "value": stats.wards_placed
            },
            {
                "label": "tower_kills",
                "value": stats.tower_kills
            },
        ]

    @staticmethod
    def sanitize_match(stats_label_value):
        # creating complete double array of all values
        double_array = []
        for obj in stats_label_value:
            double_array.append(obj["value"])

        # removing specific label value from
        # complete double array for each label
        map = {}
        for index, obj in enumerate(stats_label_value):
            map[obj["label"]] = numpy.array(
                [v for i, v in enumerate(double_array) if (i != index)])

        return map

    @staticmethod
    def sanitize_match_of_summoner(summoner_id, match):
        for team in match.detail.teams:
            for p in team.participants:
                if p.summoner.id == summoner_id:
                    return ComputationSanitizer.sanitize_match(
                        ComputationSanitizer.map_stats(p.statistics))

        return None


def fetch_and_sanitize(grpc_port, summoner_id, region_str, sample_size):
    """Fetch and sanitize random matches."""

    region = constants_pb2.Region.Value(region_str)

    matrix = []
    cf = ComputationFetcher("127.0.0.1:%d" % grpc_port)
    for match in cf.fetch_random_sample(
            summoner_id, region, sample_size):  # TODO: region
        matrix.append(
            ComputationSanitizer.sanitize_match_of_summoner(summoner_id, match)
        )

    return matrix
