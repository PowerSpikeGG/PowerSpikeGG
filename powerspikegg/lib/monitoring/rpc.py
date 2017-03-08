import functools
import gflags

from prometheus_client import core

import powerspikegg.lib.monitoring.server  # used for flag enable_prometheus

FLAGS = gflags.FLAGS

gflags.DEFINE_boolean("enable_rpc_monitoring", True, "enable rpc monitoring")

counter = None  # Counter is only initialized if required

def endpoint_monitoring():
    """Decorator used to create automatically a monitoring entry in Prometheus.

    TODO(funkysayu): Support monitoring of processing time of an endpoint.
    """
    global counter
    if counter is None:
        counter = core.Counter('rpc_endpoint',
                'gRPC endpoint monitoring', ['rpc', 'type'])

    def decorator(func):
        endpoint_name = func.__name__
        call_counter = counter.labels(endpoint_name, 'calls')
        success_counter = counter.labels(endpoint_name, 'success')
        error_counter = counter.labels(endpoint_name, 'errors')

        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            """Wraps the endpoint function calls to increment counters."""
            # Act as if we didn't wrap this function if the feature is disabled
            if not FLAGS.enable_prometheus or not FLAGS.enable_rpc_monitoring:
                return func(*args, **kwargs)

            call_counter.inc()

            try:
                result = func(*args, **kwargs)
                success_counter.inc()
                return result
            except:
                error_counter.inc()
                raise

        return wrapper
    return decorator
