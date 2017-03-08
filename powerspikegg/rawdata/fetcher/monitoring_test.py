import unittest

from prometheus_client import core

from powerspikegg.rawdata.fetcher import handler
from powerspikegg.rawdata.fetcher import monitoring


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

        watcher = monitoring.FetcherWatcher(auto_start=False)
        watcher.update()
        self.assertEqual(0, self._get_gauge_count(limiter))

    def test_rate_limiter_with_updates(self):
        """Tests the watcher catches correctly rate limiter updates."""
        monitoring.FetcherWatcher.limiters_gauges = {}

        limiter = handler.RateLimiter(10, 10)
        monitoring.FetcherWatcher.register_rate_limiter(limiter)

        watcher = monitoring.FetcherWatcher(auto_start=False)
        self.assertEqual(0, self._get_gauge_count(limiter))

        limiter.add_request()
        watcher.update()
        self.assertEqual(1, self._get_gauge_count(limiter))

        limiter.add_request()
        watcher.update()
        self.assertEqual(2, self._get_gauge_count(limiter))


if __name__ == "__main__":
    unittest.main()
