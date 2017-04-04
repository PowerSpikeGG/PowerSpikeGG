"""Utility to train Tensorflow models"""

import os

import tensorflow as tf


class GraphTrainer:
    """ Load an existing graph and expose methods to train and evaluate it"""

    def __init__(self, model_path, learning_rate=None):
        self.model_path = model_path
        self.learning_rate = learning_rate
        self._load()

    def _load(self):
        """ Load a metagraph using Tensorflow loader and inject the graph
            and the variables into a new session
        """
        self.sess = tf.Session()

        meta_graph_path = self.model_path + '.meta'
        self.saver = tf.train.import_meta_graph(meta_graph_path)
        self.saver.restore(self.sess, self.model_path)

        self.train_op = tf.get_collection('train_op')[0]
        self.learning_rate_op = tf.get_collection('learning_rate')[0]
        self.logits = tf.get_collection('logits')[0]
        self.answer = tf.get_collection('answer')[0]
        self.loss_op = tf.get_collection('loss_op')[0]
        self.placeholder = tf.get_collection('placeholder')[0]
        self.eval_op = tf.get_collection('eval_op')[0]

    def train(self, data, answer, iteration=1):
        """ Train the variable of a graph using the provided data

            Args:
                data_fetch_fn: a function which return a new sample of data
                               on each call. The returned data must be an array
                               tuple containing the input data and
                               the correct answer

                iteration: Number of iteration on the dataset
                           <=> number of call on data_fetch_fn

            Return: None

        """
        for _ in range(iteration):
            feed_dict = {
                        self.placeholder: data,
                        self.answer: answer
            }
            if self.learning_rate is not None:
                feed_dict.update({
                    self.learning_rate_op: self.learning_rate
                })
            self.sess.run(self.train_op, feed_dict=feed_dict)

    def evaluate(self, inputs, answers):
        """ Evaluate the performance of a model on the provided data

            Args:
                inputs: An array of input data (each row is an input)

                answers: An array of the expected result for the data
                         (the indices must matches with the inputs)

            Return: An array of tuple containing the computed value
                    and the difference with the target
        """
        res = self.sess.run([self.logits, self.eval_op,
                             self.placeholder, self.answer], feed_dict={
                self.placeholder: inputs,
                self.answer: answers
            })
        return res

    def close(self):
        """ Close the Tensorflow session
            (note that the object become unusable afterward)
        """
        self.sess.close()

    def save(self):
        """ Save the model """
        checkpoint_file = self.model_path
        self.saver.save(self.sess, checkpoint_file)
