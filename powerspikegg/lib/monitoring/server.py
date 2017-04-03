import contextlib
import gflags
import logging

from prometheus_client import start_http_server

from powerspikegg.lib.monitoring import watcher


FLAGS = gflags.FLAGS

# TODO(funkysayu): once the stack fully support prometheus, remove this flag.
gflags.DEFINE_boolean("enable_prometheus", False, "enable prometheus tracing")
gflags.DEFINE_integer("prometheus_server_port", 8002,
                      "port on which the prometheus server will listen")
gflags.DEFINE_integer("prometheus_watcher_update_rate", 500,
                      "update rate of the watchers")


@contextlib.contextmanager
def prometheus_monitoring():
    """Starts the server in foreground."""
    # TODO(funkysayu): refactor this so we have a clean server shutdown.
    if FLAGS.enable_prometheus:
        start_http_server(FLAGS.prometheus_server_port)
        logging.info("Prometheus server started up on :%d" %
                     FLAGS.prometheus_server_port)
    with watcher.create_context(FLAGS.prometheus_watcher_update_rate):
        yield None
