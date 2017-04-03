"""Builds the graph (neural networ).

Implements the inference/loss/training pattern for model building.

1. inference() - Builds the model as far as is required for running the network
forward to make predictions.
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

# Number of statistics to use in order to make the prediction
INPUT_SIZE = 2

def inference(data, input_size, hidden1_units, hidden2_units):
  """Build the model up to where it may be used for inference.

  Args:
    data: data placeholder, from inputs().
    hidden1_units: Size of the first hidden layer.
    hidden2_units: Size of the second hidden layer.

  Returns:
    softmax_linear: Output tensor with the computed logits.
  """
  # Hidden 1
  with tf.name_scope('hidden1'):
    weights = tf.Variable(
        tf.truncated_normal([input_size, hidden1_units],
                            stddev=1.0 / math.sqrt(float(input_size))),
        name='weights')
    biases = tf.Variable(tf.zeros([hidden1_units]),
                         name='biases')
    hidden1 = tf.nn.relu(tf.matmul(data, weights) + biases)
  # Hidden 2
  with tf.name_scope('hidden2'):
    weights = tf.Variable(
        tf.truncated_normal([hidden1_units, hidden2_units],
                            stddev=1.0 / math.sqrt(float(hidden1_units))),
        name='weights')
    biases = tf.Variable(tf.zeros([hidden2_units]),
                         name='biases')
    hidden2 = tf.nn.relu(tf.matmul(hidden1, weights) + biases)
  # Linear
  with tf.name_scope('result_computation'):
    weights = tf.Variable(
        tf.truncated_normal([hidden2_units, 1],
                            stddev=1.0 / math.sqrt(float(hidden2_units))),
        name='weights')
    biases = tf.Variable(tf.zeros([1]),
                         name='biases')
    logits = tf.add(tf.matmul(hidden2, weights), biases)
  named_logits = tf.identity(logits, name = "logits")
  return named_logits


def loss(logits, labels):
  """Calculates the loss from the logits and the labels.

  Args:
    logits: Logits tensor, float - [batch_size, 1].
    labels: Labels tensor, float - [batch_size].

  Returns:
    loss: Loss tensor of type float.
  """
  #labels = tf.to_int64(labels)
  #cross_entropy = tf.nn.sparse_softmax_cross_entropy_with_logits(
  #    labels=labels, logits=logits, name='xentropy')

  return tf.reduce_sum(tf.pow(logits - labels, 2), name='square_error')


def training(loss, learning_rate):
  """Sets up the training Ops.

  Creates a summarizer to track the loss over time in TensorBoard.

  Creates an optimizer and applies the gradients to all trainable variables.

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
  optimizer = tf.train.GradientDescentOptimizer(learning_rate)
  # Create a variable to track the global step.
  global_step = tf.Variable(0, name='global_step', trainable=False)
  # Use the optimizer to apply the gradients that minimize the loss
  # (and also increment the global step counter) as a single training step.
  train_op = optimizer.minimize(loss, global_step=global_step)
  return train_op


def evaluation(logits, labels):
  """Evaluate the quality of the logits at predicting the label.

  Args:
    logits: Logits tensor, float - [batch_size, NUM_CLASSES].
    labels: Labels tensor, int32 - [batch_size], with values in the
      range [0, NUM_CLASSES).

  Returns:
    A scalar int32 tensor with the number of examples (out of batch_size)
    that were predicted correctly.
  """
  # For a classifier model, we can use the in_top_k Op.
  # It returns a bool tensor with shape [batch_size] that is true for
  # the examples where the label is in the top k (here k=1)
  # of all logits for that example.
  correct = tf.abs(logits - labels)
  # Return the number of true entries.
  return tf.reduce_sum(correct)

def generate_graph(model_directory, input_size):
  """Create a new graph from inference and training operator and export the model 
  with an empty checkpoint
  """
  
  with tf.Graph().as_default():

    # Tensor containing the input values
    input = tf.placeholder(tf.float32, shape=(None, input_size), name="placeholder")

    # Tensor containing the correct answer for the input
    answer = tf.placeholder(tf.float32, shape=(None, 1), name="answer")

    # Result of the computation of the neural network
    logits = inference(input, input_size, 5, 5);

    # Squared sum of the difference between the predicted value and the answers
    loss_op = loss(logits, answer)

    # Operator to train the neural network
    train_op = training(loss_op, 0.01)

    # Give an estimation of the difference between the predicted values and the answer
    eval_op = evaluation(logits, answer)

    # Create a summary for tensorboard
    summary = tf.summary.merge_all()

    # Create all variables
    init_op = tf.global_variables_initializer()

    # Save the state of the graph and the variables
    saver = tf.train.Saver()

    # Create a session to execute the graph
    with tf.Session() as sess:
      
        # Place a summary in the log directory
        summary_writer = tf.summary.FileWriter(model_directory, sess.graph)

        # Initialise all variables
	sess.run(init_op)

        # Save the model
        checkpoint_file = os.path.join(model_directory, "model.ckpt")

        saver.save(sess, checkpoint_file, 0)

def test_training():
  """Train a neural network and display progression, export the model at the end.
  """
  with tf.Graph().as_default():

    # Tensor containing the input values
    input = tf.placeholder(tf.float32, shape=(None, INPUT_SIZE), name="placeholder")

    # Tensor containing the correct answer for the input
    answer = tf.placeholder(tf.float32, shape=(None, 1), name="answer")

    # Result of the computation of the neural network
    logits = inference(input, INPUT_SIZE, 5,5);

    # Squared sum of the difference between the predicted value and the answers
    loss_op = loss(logits, answer)

    # Operator to train the neural network
    train_op = training(loss_op, 0.01)

    # Give an estimation of the difference between the predicted values and the answer
    eval_op = evaluation(logits, answer)

    # Create a summary for tensorboard
    summary = tf.summary.merge_all()

    # Create all variables
    init_op = tf.global_variables_initializer()

    # Save the state of the graph and the variables
    saver = tf.train.Saver()

    # Create a session to execute the graph
    with tf.Session() as sess:
      
        # Place a summary in the log directory
        summary_writer = tf.summary.FileWriter("log", sess.graph)

        # Initialise all variables
	sess.run(init_op)

        # Train the model for 2000 step
        for i in range(2000):
            _, loss_value = sess.run([train_op, loss_op], feed_dict={
                input: [[2,2],[1,2],[1,0],[1,5]], 
                answer: [[4],[3],[1],[6]]
            })

            if (i % 100 == 0): print(loss_value)

        # Evaluate the error on an exemple
        error = sess.run([eval_op], feed_dict = {
            input: [[2,3],[1,0]],
            answer: [[5],[1]]
        })

        print(error)

        # Save the model
        checkpoint_file = "log/model.ckpt"

        saver.save(sess, checkpoint_file, 2000)

