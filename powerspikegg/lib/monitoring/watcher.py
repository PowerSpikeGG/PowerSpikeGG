import contextlib
import threading
import time

class _Registry:
    """Manage the list of watchers registered from diverse libraries."""

    def __init__(self):
        self.registered_watchers = []
        self._keep_alive = False

    def register_watcher(self, watcher_class):
        """Add a watcher class into the registry and initialize it."""
        self.registered_watchers.append(watcher_class())

    def start_watchers(self, update_rate):
        """Starts a thread periodically updating registered watchers."""
        self._thread = threading.Thread(target=self._update_loop,
                                        args=(update_rate,))
        self._keep_alive = True
        self._thread.start()

    def is_running(self):
        """Checks if the update loop started."""
        return self._keep_alive

    def stop_watchers(self):
        """Ensures the thread updating the watchers is stopped correctly."""
        self._keep_alive = False
        self._thread.join()

    @contextlib.contextmanager
    def context_manager(self, update_rate):
        """Create a context running the watchers, making sure it stops them."""
        self.start_watchers(update_rate)
        try:
            yield
        finally:
            self.stop_watchers()

    def _update_loop(self, update_rate):
        """Periodically update the watchers so the metrics are up to date."""
        while self._keep_alive:
            # Checks every 50ms if the thread should be kept alive.
            for waited_time in range(0, update_rate, 50):
                if not self._keep_alive:
                    return
                time.sleep(0.05)
            time.sleep(update_rate * 1. / 100 - waited_time)

            for watchers in self.registered_watchers:
                try:
                    watchers.update()
                except:
                    pass  # TODO(funkysayu): Might need some logging here.


# Defines the watcher module API.
REGISTRY = _Registry()
register_watcher = REGISTRY.register_watcher
create_context = REGISTRY.context_manager
