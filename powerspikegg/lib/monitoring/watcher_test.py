import mock
import time
import unittest

from powerspikegg.lib.monitoring import watcher


class MockWatcher:
    """Mock watcher used for testing purpose."""

    instance = None

    def __init__(self):
        MockWatcher.instance = self
        self.update = mock.Mock()


class SomeException(Exception):
    """Some specific exception that might be raised anytime."""


class MonitoringWatcherTest(unittest.TestCase):
    """Tests the library registers and auto-start the watchers."""

    def test_watcher_registration(self):
        """Tests watcher registration works as exepcted."""
        watcher_class = watcher.register_watcher(MockWatcher)

        self.assertIn(MockWatcher.instance,
                      watcher.REGISTRY.registered_watchers)
        self.assertIsNotNone(MockWatcher.instance)

    def test_update_thread(self):
        """Tests the update thread periodically calls the watchers."""
        watcher_class = watcher.register_watcher(MockWatcher)

        watcher.REGISTRY.start_watchers(40)
        time.sleep(0.05)
        watcher_class.instance.update.assert_called_once()
        watcher.REGISTRY.stop_watchers()

    def test_contextual_failure_stops_watchers(self):
        """Tests if registry stops updates if an exception is raised."""
        watcher_class = watcher.register_watcher(MockWatcher)

        with self.assertRaises(SomeException):
            with watcher.create_context(40):
                time.sleep(0.05)
                watcher_class.instance.update.assert_called_once()

                raise SomeException("Whoops! Error prone code!")
        # Still, the registry should have stopped the update loop
        self.assertFalse(watcher.REGISTRY.is_running())


if __name__ == "__main__":
    unittest.main()
