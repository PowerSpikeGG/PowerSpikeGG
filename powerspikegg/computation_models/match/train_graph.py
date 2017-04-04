""" Train an existing graph """

import argparse

from train import GraphTrainer

FLAGS = None


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
    parser = argparse.ArgumentParser()
    parser.add_argument(
            '--model_path',
            type=str,
            default='/tmp/model/model.ckpt',
    )
    parser.add_argument(
            '--iteration',
            type=int,
            default=100
    )
    FLAGS, unparsed = parser.parse_known_args()
    main()
