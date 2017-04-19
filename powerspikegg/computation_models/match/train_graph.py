""" Train an existing graph """

import gflags
import sys

from powerspikegg.computation_models.match.train import GraphTrainer
from powerspikegg.computation_models.fetcher import fetcher

gflags.DEFINE_string("model_path", "/tmp/model/model.ckpt",
                     "Path to the model definition")
gflags.DEFINE_integer("iteration", 1,
                      "Number of training iterations")
gflags.DEFINE_string("field_name", "kills",
                     "Name of the stats to use for training")
gflags.DEFINE_float("learning_rate", 0.01,
                    "Rate for the optimizer (Adam)")
FLAGS = gflags.FLAGS


def fetch_match(match_quantity):
    """ Use the fetcher module to gather matchs data in cache

        Note: each match is composed of 5 values, 1 for each member of
              the winning team

        Args:
            match_quantity: number of match to fetch

        Return
            data: The input data (all stats except the excepted stat)
            excepted: The stat to predict (define by field_name flag)
    """
    stats = [(stat["data"], stat["expected"]) for stat in
             fetcher.fetch_and_sanitize(match_quantity)
             if stat["label"] == FLAGS.field_name]
    data, expected = zip(*stats)
    return data, expected


def train(trainer, iteration, batch_size):
    """ Train a model using tensorflow

        The function save the model and print an evaluation after
        a number of prefined number of training

        Args:
            iteration: number of training iteration
            batch_size: number of match to use for each training step

    """
    for step in range(iteration):
        try:
            data, expected = fetch_match(batch_size)
            trainer.train(
                    data=data,
                    answer=[[exp] for exp in expected],
                    iteration=1
            )
            if (step % 10 == 0):
                data, expected = fetch_match(1)
                predicted, score, _, expected = trainer.evaluate(
                        inputs=data,
                        answers=[[exp] for exp in expected]
                )
                print("--------------")
                print("predicted")
                print(predicted)
                print("expected")
                print(expected)
                print("score")
                print(score)
                print(" ")
                sys.stdout.flush()
                trainer.save()
        except Exception:
            print "Error while training model"


def main():
    trainer = GraphTrainer(FLAGS.model_path, FLAGS.learning_rate)
    train(trainer, FLAGS.iteration, batch_size=50)
    trainer.save()

if __name__ == '__main__':
    FLAGS(sys.argv)
    main()
