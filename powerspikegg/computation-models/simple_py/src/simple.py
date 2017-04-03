
import tensorflow as tf

def main():
    x = tf.placeholder(tf.float32, [None, 2])
    y = tf.constant([2.0, 2.0])

    serve = tf.add(x,y, name="serve")
    W = tf.Variable([.3], tf.float32)

    # Add an op to initialize the variables.
    init_op = tf.global_variables_initializer()

    saver = tf.train.Saver()

    with tf.Session() as sess:
        sess.run(init_op)
        print (sess.run(serve, {x: [[1.0,1.0]]}))

        print(saver.save(sess, "models/graph.chkp", write_meta_graph=True)) 





main()
