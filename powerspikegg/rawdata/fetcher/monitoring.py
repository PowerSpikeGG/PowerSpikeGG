from collections import OrderedDict

from prometheus_client import core

from powerspikegg.lib.monitoring import watcher

"""Monitoring logic of the rawdata fetcher server.

Implements a watcher periodically checking status of the endpoint.
"""

rate_limit_counter = core.Gauge(
    "riotapi_rate_limit",
    "Riot API rate limiters",
    ["id", "queue_capacity", "max_per_seconds"],
)


@watcher.register_watcher
class FetcherWatcher():
    """Implements a watcher that periodically get information on the fetcher.

    The only information supported now is the rate limiter.
    """

    limiters_gauges = OrderedDict({})

    def __init__(self, auto_start=True):
        pass

    @classmethod
    def register_rate_limiter(cls, limiter):
        """Registers a rate limiter to watch."""
        labels = dict(
            id=len(cls.limiters_gauges),
            queue_capacity=limiter.allowed_requests,
            max_per_seconds=limiter.allowed_requests / limiter.seconds,
        )
        print(labels)
        cls.limiters_gauges[limiter] = rate_limit_counter.labels(**labels)

    def update(self):
        """Update the rate limiters gauges to the current queue size."""
        for limiter, gauge in self.limiters_gauges.items():
            limiter.request_available()  # Force the limiter to reload
            gauge.set(len(limiter.made_requests))
