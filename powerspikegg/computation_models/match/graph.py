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

    def add_hidden_layer(self, data, units, name, is_training):
        """ Create a simple layer for a neural network

            The layer contains:
                - A normalization layer
                - A dense layer

            Args:
                data: a tensor with the input data
                units: the number of units in the hidden dense layer
                name: name of the scope in which the operations take place
                is_training: tensor containing a boolean to indicate if the
                             model is training or in evaluation
                             (this is useful for normalization)

            Return:
                A tensor computed with all the intermediate layers
        """
        with tf.name_scope(name):
            norm = tf.layers.batch_normalization(data, training=is_training)
            hidden = tf.layers.dense(
                    name=name,
                    inputs=norm,
                    units=units,
                    activation=tf.nn.relu,
                    kernel_initializer=tf.contrib.layers.xavier_initializer(),
                    bias_initializer=tf.contrib.layers.xavier_initializer())
            dropout = tf.layers.dropout(hidden, training=is_training)

            # Create summary for tensorboard
            variables = tf.get_collection(tf.GraphKeys.TRAINABLE_VARIABLES,
                                          name)
            weight = variables[0]
            bias = variables[1]
            tf.summary.histogram('weight', weight)
            tf.summary.histogram('bias', bias)
            tf.summary.histogram('activation', hidden)

        return dropout

    def create_network(self, data, layers, is_training):
    	""" Create a deep neural network

            Args:
                data: A tensor with the input data
                layers: An array with the size of each layer
                is_training: A tensor containing a boolean to indicate if the
                             model is training
        """
        # Build the hidden layers of the network
        hidden = data
        for index, layer_size in enumerate(layers):
            hidden = self.add_hidden_layer(hidden, layer_size,
                                           "hidden_layer_" + str(index),
                                           is_training)

        # Final layer with only one cell containing the predicted value
        logits = tf.layers.dense(inputs=hidden, units=1)

        return logits

    def inference(self, data, is_training):
        """Build the model up to where it may be used for inference.

        Args:
            data: data placeholder, from inputs().
            is_training: A tensor containing a boolean to indicate if the model
                         is training

        Returns:
            Output tensor with the logits predicted by the neural network.
        """
        # Create 20 hidden layers with 30 units
        layers = [60 for _ in range(30)]
        logits = self.create_network(data, layers, is_training=is_training)
        return tf.identity(logits, name="logits")

    def loss(self, logits, labels):
        """Calculates the loss from the logits and the labels.

        Args:
            logits: Logits tensor, float - [batch_size].
            labels: Labels tensor, float - [batch_size].

        Returns:
            loss: Loss tensor of type float.
        """
        loss = tf.losses.mean_squared_error(labels, logits)
        tf.summary.scalar('loss', loss)
        return loss

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
        # Create the gradient descent optimizer with the given learning rate.
        optimizer = tf.train.AdamOptimizer(learning_rate)
        # Create a variable to track the global step.
        global_step = tf.Variable(0, name='global_step', trainable=False)
        # Use the optimizer to apply the gradients that minimize the loss
        # as a single training step.
        extra_update_ops = tf.get_collection(tf.GraphKeys.UPDATE_OPS)
        with tf.control_dependencies(extra_update_ops):
            train_op = optimizer.minimize(loss, global_step=global_step)
        return train_op, global_step

    def evaluation(self, logits, labels):
        """Evaluate the quality of the logits at predicting the label.

        Args:
            logits: Logits tensor, float - [batch_size].
            labels: Labels tensor, float - [batch_size].

        Returns:
            A scalar float tensor with the precision of the prediction.
        """
        # Compute the difference between the expected label and the predicted.
        correct = tf.abs(logits - labels)
        total_error = tf.reduce_sum(correct)
        mean_error = tf.reduce_mean(correct)
        tf.summary.scalar('total_error', total_error)
        tf.summary.scalar('mean_error', mean_error)
        return mean_error

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

            # Indicate wether the models is used for training or evaluation
            is_training = tf.placeholder_with_default(False, shape=(),
                                                      name="is_learning")

            # Tensor containing the correct answer for the input
            answer = tf.placeholder(tf.float32, shape=(None, 1), name="answer")

            # Result of the computation of the neural network
            logits = self.inference(placeholder, is_training)

            # Squared sum of the difference between the predicted value
            # and the answers
            loss_op = self.loss(logits, answer)

            # Operator to train the neural network
            train_op, global_step = self.training(loss_op, learning_rate)

            # Give an estimation of the difference between the predicted
            # values and the answer
            eval_op = self.evaluation(logits, answer)

            # Create a summary for tensorboard
            summary_op = tf.summary.merge_all()

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
            tf.add_to_collection('is_training', is_training)
            tf.add_to_collection('summary_op', summary_op)
            tf.add_to_collection('global_step', global_step)

            # Create a session to execute the graph
            with tf.Session(config=tf.ConfigProto(
                            log_device_placement=True)) as sess:

                # Place a summary in the log directory
                summary_writer = tf.summary.FileWriter(model_directory,
                                                       sess.graph)

                # Initialise all variables
                sess.run(init_op)

                # Save the model
                checkpoint_file = os.path.join(model_directory, "model.ckpt")

                saver.save(sess, checkpoint_file)
                saver.export_meta_graph(checkpoint_file + '.meta')
