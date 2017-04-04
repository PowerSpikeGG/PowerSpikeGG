""" Train an existing graph """

import gflags
import sys

from powerspikegg.computation_models.match.train import GraphTrainer
from powerspikegg.computation_models.fetcher import fetcher

gflags.DEFINE_string("model_path", "/tmp/model/model.ckpt",
                     "Path to the model definition")
gflags.DEFINE_integer("iteration", 1,
                      "Number of training iterations")

FLAGS = gflags.FLAGS


def main():
    trainer = GraphTrainer(FLAGS.model_path)
    for step in range(FLAGS.iteration):
        stats = [(stat["data"], stat["expected"]) for stat in
                 fetcher.fetch_and_sanitize(2) if stat["label"] == "kills"]
        data, expected = zip(*stats)
        print(data)
        trainer.train(
                data=data,
                answer=[[exp] for exp in expected],
                iteration=20
        )
        res, score, placeholder, answer = trainer.evaluate(
                inputs=data,
                answers=[[exp] for exp in expected]
        )
        print("--------------")
        print("result")
        print(res)
        print(score)
        print("data")
        print(placeholder)
        print(answer)
        print(" ")
    trainer.save()


if __name__ == '__main__':
    FLAGS(sys.argv)
    main()
