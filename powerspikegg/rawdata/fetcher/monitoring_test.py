import unittest

from prometheus_client import core

from powerspikegg.lib.mongodb import wrapper
from powerspikegg.rawdata.fetcher import handler
from powerspikegg.rawdata.fetcher import monitoring


class MongoDBMonitoringTests(unittest.TestCase):
    """Ensures mongodb is correctly monitored."""

    @classmethod
    def setUpClass(cls):
        """Instantiate a mongo db server"""
        cls.server = wrapper.create_mongo_server()
        cls.client = cls.server.client

    @classmethod
    def tearDownClass(cls):
        """Stop the fake mongodb server."""
        cls.server.shutdown()

    def setUp(cls):
        """Reset the watcher at every tests."""
        monitoring.MongoDBWatcher.watched_collections = {}
        monitoring.MongoDBWatcher.server_address = None

    def test_client_connection(self):
        """Tests the watcher can connect to the mongo server."""
        monitoring.MongoDBWatcher.register_server_address(self.server.address)
        # Not totally tested, we just want to ensure this won't crash.

    def test_metric_updates(self):
        """Ensures monitoring metrics are correctly updated."""
        database = "test_metric_updates"
        collection_name = "foo"
        collection = self.client[database][collection_name]

        collection.insert({"foo": "bar"})
        monitoring.MongoDBWatcher.register_server_address(self.server.address)
        monitoring.MongoDBWatcher.register_monitorable_collection(
            database, collection_name)
        watcher = monitoring.MongoDBWatcher()
        watcher.update()

        count = core.REGISTRY.get_sample_value("mongodb_elements_count", dict(
            database=database, collection=collection_name))
        self.assertEqual(count, collection.count())

        collection.insert({"another": "foo"})
        count = core.REGISTRY.get_sample_value("mongodb_elements_count", dict(
            database=database, collection=collection_name))
        self.assertNotEqual(count, collection.count())

        watcher.update()
        count = core.REGISTRY.get_sample_value("mongodb_elements_count", dict(
            database=database, collection=collection_name))
        self.assertEqual(count, collection.count())


class RawDataMonitoringTests(unittest.TestCase):
    """Ensure monitoring metrics are correctly handled in the fetcher."""

    @staticmethod
    def _get_gauge_count(limiter):
        """Retrieves the gauge count from the registry."""
        gauges = monitoring.FetcherWatcher.limiters_gauges
        id = next(i for i, l in enumerate(gauges) if l == limiter)
        labels = dict(
            id=str(id),
            queue_capacity=str(limiter.allowed_requests),
            max_per_seconds=str(limiter.allowed_requests / limiter.seconds),
        )

        return core.REGISTRY.get_sample_value("riotapi_rate_limit", labels)

    def setUp(self):
        """Ensure the registered rates limiters are reseted for each tests."""
        monitoring.FetcherWatcher.limiters_gauges = {}

    def test_rate_limiter_registration(self):
        """Tests the monitorer register correctly a rate limiter."""
        limiter = handler.RateLimiter(10, 10)
        monitoring.FetcherWatcher.register_rate_limiter(limiter)

        self.assertIn(limiter,
                      monitoring.FetcherWatcher.limiters_gauges)
        self.assertIsNotNone(self._get_gauge_count(limiter))

    def test_rate_limiter_no_update(self):
        """Tests a rate limiter information is correctly updated."""
        limiter = handler.RateLimiter(10, 10)
        monitoring.FetcherWatcher.register_rate_limiter(limiter)

        watcher = monitoring.FetcherWatcher()
        watcher.update()
        self.assertEqual(0, self._get_gauge_count(limiter))

    def test_rate_limiter_with_updates(self):
        """Tests the watcher catches correctly rate limiter updates."""
        monitoring.FetcherWatcher.limiters_gauges = {}

        limiter = handler.RateLimiter(10, 10)
        monitoring.FetcherWatcher.register_rate_limiter(limiter)

        watcher = monitoring.FetcherWatcher()
        self.assertEqual(0, self._get_gauge_count(limiter))

        limiter.add_request()
        watcher.update()
        self.assertEqual(1, self._get_gauge_count(limiter))

        limiter.add_request()
        watcher.update()
        self.assertEqual(2, self._get_gauge_count(limiter))


if __name__ == "__main__":
    unittest.main()
