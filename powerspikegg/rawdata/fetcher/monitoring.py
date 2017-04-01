import pymongo

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

mongodb_counters = core.Gauge(
    "mongodb_elements_count",
    "Mongo DB collection count watcher",
    ["database", "collection"],
)

mongodb_state = core.Gauge(
    "mongodb_state",
    "Mongo DB state",
)


@watcher.register_watcher
class MongoDBWatcher():
    """Implements a watcher able to check the state of the Mongo DB instance"""

    watched_collections = {}
    server_address = None

    @classmethod
    def register_server_address(cls, server_address):
        """Register the address of the server."""
        cls.server_address = server_address

    @classmethod
    def register_monitorable_collection(cls, database, collection):
        """Registers a collection name into the database."""
        counter = mongodb_counters.labels(
            database=database, collection=collection)
        cls.watched_collections[(database, collection)] = counter

    def update(self):
        """Update the metrics on mongo DB status."""
        if self.server_address is None:
            return

        try:
            client = self.get_client()
        except Exception as e:  # TODO(funkysayu) too broad exception
            mongodb_state.set(0)
            return
        mongodb_state.set(1)

        for (db, collection), counter in self.watched_collections.items():
            print(client[db][collection].count())
            counter.set(client[db][collection].count())

    def get_client(self):
        """Get a client to the server."""
        client = pymongo.MongoClient(
            self.server_address, serverSelectionTimeoutMS=100)

        # Send a query to the server to ensure the connection is working.
        client.server_info()
        return client


@watcher.register_watcher
class FetcherWatcher():
    """Implements a watcher that periodically get information on the fetcher.

    The only information supported now is the rate limiter.
    """

    limiters_gauges = OrderedDict({})

    @classmethod
    def register_rate_limiter(cls, limiter):
        """Registers a rate limiter to watch."""
        labels = dict(
            id=len(cls.limiters_gauges),
            queue_capacity=limiter.allowed_requests,
            max_per_seconds=limiter.allowed_requests / limiter.seconds,
        )
        cls.limiters_gauges[limiter] = rate_limit_counter.labels(**labels)

    def update(self):
        """Update the rate limiters gauges to the current queue size."""
        for limiter, gauge in self.limiters_gauges.items():
            limiter.request_available()  # Force the limiter to reload
            gauge.set(len(limiter.made_requests))
