"""Generate a graph with a neural network to apply regression.

NOTE: the graph is not trained

Args:
    model_dir: Directory to store the created graph
    input_size: Size of the tensor used to store the input
"""

import gflags
import sys

from graph import GraphBuilder

gflags.DEFINE_string("model_dir", "/tmp/model",
                     "Output directory of the model")
gflags.DEFINE_integer("input_size", 2,
                      "Size of the input (the given vector to the model)")

FLAGS = gflags.FLAGS


def main():
    builder = GraphBuilder(FLAGS.input_size)
    builder.generate_graph(FLAGS.model_dir)


if __name__ == '__main__':
    FLAGS([sys.argv])
    main()
