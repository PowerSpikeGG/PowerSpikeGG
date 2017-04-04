""" Train an existing graph """

import gflags
import sys

from powerspikegg.computation_models.match.train import GraphTrainer

gflags.DEFINE_string("model_path", "/tmp/model/model.ckpt",
                     "Path to the model definition")
gflags.DEFINE_integer("iteration", 100,
                      "Number of training iterations")

FLAGS = gflags.FLAGS


def main():
    trainer = GraphTrainer(FLAGS.model_path)
    result, score = trainer.evaluate([[2, 2]], [[4]])
    print(result)
    print(score)
    for step in range(FLAGS.iteration):
        trainer.train(
                data=[[1, 2], [1, 3], [2, 3]],
                answer=[[3], [4], [5]]
        )
    result, score = trainer.evaluate([[2, 2]], [[4]])
    print(result)
    print(score)
    trainer.save()


if __name__ == '__main__':
    FLAGS([sys.argv])
    main()
