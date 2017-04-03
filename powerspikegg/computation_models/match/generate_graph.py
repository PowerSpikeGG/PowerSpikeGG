""" Generate a graph with a neural network to apply regression (the graph is not trained)
    
    Args:
        model_dir: Directory to store the created graph
        input_size: Size of the tensor used to store the input
"""

import argparse

from graph import generate_graph

FLAGS = None

def main():
    generate_graph(FLAGS.model_dir, FLAGS.input_size)

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument(
            '--model_dir',
            type=str,
            default='/tmp/model',
    )
    parser.add_argument(
            '--input_size',
            type=int,
            default=2
    )
    FLAGS, unparsed = parser.parse_known_args()
    main()
