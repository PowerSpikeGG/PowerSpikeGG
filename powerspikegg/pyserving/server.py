import gflags
import grpc
import os
import sys
import time

from concurrent import futures

from powerspikegg.serving.public import match_computation_pb2 as mc_pb2
from powerspikegg.computation_models.match import train
from powerspikegg.computation_models.fetcher import fetcher


gflags.DEFINE_integer("port", 50051,
                      "port on which the match computation listen")
gflags.DEFINE_integer("max_workers", 10, "max grpc workers")
gflags.DEFINE_string("model_root_path",
                     "/tmp/powerspikegg/models",
                     "model root path")

FLAGS = gflags.FLAGS


class MatchComputation(mc_pb2.MatchComputationServicer):

    models = {}

    def __init__(self):
        pass

    def GetFeature(self, request, context):
        for team in request.match.detail.teams:
            p = next((p for p in team.participants
                      if p.summoner.id == request.summoner_id), None)
            if p is not None:
                break
        else:
            raise ValueError("Summoner not found in the proto!")

        stats = fetcher._prepare_data(fetcher._map_stats(p.statistics))
        return mc_pb2.MatchComputationFeature(
            expected_statistics=mc_pb2.Statistics(
                kills=self.compute_stats("kills", stats),
                deaths=self.compute_stats("deaths", stats),
                assists=self.compute_stats("assists", stats),
                minion_killed=self.compute_stats("minions_killed", stats),
                # neutral_minions_killed=self.compute_stats(
                #     "neutral_minions_killed", stats),
                total_damages=self.compute_stats(
                    "total_damages", stats),
                total_heal=self.compute_stats("total_heal", stats),
                wards_placed=self.compute_stats("wards_placed", stats),
                tower_kills=self.compute_stats("tower_kills", stats),
            )
        )

    def compute_stats(self, keyword, stats):
        data = next(s["data"] for s in stats if s["label"] == keyword)

        if keyword not in self.models:
            model_path = os.path.join(
                FLAGS.model_root_path,
                keyword,
                "model.ckpt")
            print(model_path)
            self.models[keyword] = train.GraphTrainer(model_path)
        trainer = self.models[keyword]
        result, inputs = trainer.predict([data])

        # TODO(funkysayu) quick and dirty
        def approx(value):
            if float(value) % 1 > .5:
                return int(math.ceil(value))
            return int(math.floor(value))

        return mc_pb2.StatisticFeature(value=approx(result[0][0]),
                                       coefficient=0.0)


def start_server(listening_port, max_workers):
    service = MatchComputation()

    server = grpc.server(futures.ThreadPoolExecutor(FLAGS.max_workers))
    mc_pb2.add_MatchComputationServicer_to_server(service, server)
    server.add_insecure_port("[::]:%s" % listening_port)

    server.start()

    return server, service


def main():
    server, _ = start_server(FLAGS.port, FLAGS.max_workers)

    try:
        while True:
            time.sleep(60 * 60)
    except KeyboardInterrupt:
        server.stop(0)

if __name__ == "__main__":
    FLAGS(sys.argv)
    main()
