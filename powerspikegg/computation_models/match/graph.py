"""Builds a graph (neural network).

Implements the inference/loss/training pattern for model building.

1. inference() - Builds the model as far as it is required for running the
                 network forward to make predictions.
2. loss() - Adds to the inference model the layers required to generate loss.
3. training() - Adds to the loss model the Ops required to generate and
apply gradients.

"""
from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import math
import os

import tensorflow as tf


class GraphBuilder:
    """ Generate a graph with all variables initialized """

    def __init__(self, input_size):
        self.input_size = input_size

    def add_hidden_layer(self, data, input_size, output_size, name,
                         keep_probability, is_training):
        with tf.name_scope(name):
            weights = tf.Variable(
                tf.truncated_normal([input_size, output_size],
                                    stddev=0.1), name="weights")
            tf.summary.histogram('weights', weights)
            biases = tf.Variable(tf.zeros([output_size]), name="biases")
            mult = tf.matmul(data, weights) + biases

            # Activation
            hidden1 = tf.nn.relu(mult)

            # Batch normalization
            norm = tf.contrib.layers.batch_norm(hidden1, 0.9,
                                                is_training=is_training,
                                                updates_collections=None)

            # Droupout
            dropped = tf.nn.dropout(norm, keep_probability)

            return norm

    def createNetwork(self, data, layers, keep_probability=1,
                      is_training=True):
        current = 1
        hidden = tf.contrib.layers.batch_norm(data, 0.9,
                                              is_training=is_training,
                                              updates_collections=None)
        last_size = self.input_size
        for layer_size in layers:
            hidden = self.add_hidden_layer(hidden, last_size, layer_size,
                                           "hidden" + str(current),
                                           keep_probability, is_training)
            last_size = layer_size
            current = current + 1
        return hidden

    def inference(self, data, hidden1_units, hidden2_units):
        """Build the model up to where it may be used for inference.

        Args:
            data: data placeholder, from inputs().
            hidden1_units: Size of the first hidden layer.
            hidden2_units: Size of the second hidden layer.

        Returns:
            softmax_linear: Output tensor with the computed logits.
        """
        logits = self.createNetwork(data, [50, 50, 50, 50, 50, 1])
        return logits

    def loss(self, logits, labels):
        """Calculates the loss from the logits and the labels.

        Args:
            logits: Logits tensor, float - [batch_size, 1].
            labels: Labels tensor, float - [batch_size].

        Returns:
            loss: Loss tensor of type float.
        """
        return tf.reduce_sum(tf.pow(logits - labels, 2), name='square_error')

    def training(self, loss, learning_rate):
        """Sets up the training Ops.

        Creates a summarizer to track the loss over time in TensorBoard.
        Creates an optimizer and applies the gradients
        to all trainable variables.

        The Op returned by this function is what must be passed to the
        `sess.run()` call to cause the model to train.

        Args:
            loss: Loss tensor, from loss().
            learning_rate: The learning rate to use for gradient descent.

        Returns:
            train_op: The Op for training.
        """
        # Add a scalar summary for the snapshot loss.
        tf.summary.scalar('loss', loss)
        # Create the gradient descent optimizer with the given learning rate.
        optimizer = tf.train.AdamOptimizer(learning_rate)
        # Create a variable to track the global step.
        global_step = tf.Variable(0, name='global_step', trainable=False)
        # Use the optimizer to apply the gradients that minimize the loss
        # as a single training step.
        train_op = optimizer.minimize(loss, global_step=global_step)
        return train_op

    def evaluation(self, logits, labels):
        """Evaluate the quality of the logits at predicting the label.

        Args:
            logits: Logits tensor, float - [batch_size, NUM_CLASSES].
            labels: Labels tensor, int32 - [batch_size], with values in the
            range [0, NUM_CLASSES).

        Returns:
            A scalar int32 tensor with the number of examples
            that were predicted correctly.
        """
        # For a classifier model, we can use the in_top_k Op.
        # It returns a bool tensor with shape [batch_size] that is true for
        # the examples where the label is in the top k (here k=1)
        # of all logits for that example.
        correct = tf.abs(logits - labels)
        # Return the number of true entries.
        return tf.reduce_sum(correct)

    def generate_graph(self, model_directory):
        """Create a new graph from inference and training operator and
        export the model with an empty checkpoint
        """

        with tf.Graph().as_default():

            # Tensor containing the input values
            placeholder = tf.placeholder(tf.float32,
                                         shape=(None, self.input_size),
                                         name="placeholder")

            learning_rate = tf.placeholder_with_default(0.01, shape=(),
                                                        name="learning_rate")

            # Tensor containing the correct answer for the input
            answer = tf.placeholder(tf.float32, shape=(None, 1), name="answer")

            # Result of the computation of the neural network
            logits = self.inference(placeholder, 64, 32)

            # Squared sum of the difference between the predicted value
            # and the answers
            loss_op = self.loss(logits, answer)

            # Operator to train the neural network
            train_op = self.training(loss_op, learning_rate)

            # Give an estimation of the difference between the predicted
            # values and the answer
            eval_op = self.evaluation(logits, answer)

            # Create a summary for tensorboard
            summary = tf.summary.merge_all()

            # Create all variables
            init_op = tf.global_variables_initializer()

            # Save the state of the graph and the variables
            saver = tf.train.Saver()

            # Add variables to collections to load them later
            tf.add_to_collection('placeholder', placeholder)
            tf.add_to_collection('learning_rate', learning_rate)
            tf.add_to_collection('answer', answer)
            tf.add_to_collection('logits', logits)
            tf.add_to_collection('loss_op', loss_op)
            tf.add_to_collection('train_op', train_op)
            tf.add_to_collection('eval_op', eval_op)

            # Create a session to execute the graph
            with tf.Session() as sess:

                # Place a summary in the log directory
                summary_writer = tf.summary.FileWriter(model_directory,
                                                       sess.graph)

                # Initialise all variables
                sess.run(init_op)

                # Save the model
                checkpoint_file = os.path.join(model_directory, "model.ckpt")

                saver.save(sess, checkpoint_file)
                saver.export_meta_graph(checkpoint_file + '.meta')
