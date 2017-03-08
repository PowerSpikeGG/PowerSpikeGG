import threading
import time

from powerspikegg.rawdata.fetcher import monitoring
from third_party.python.riotwatcher import riotwatcher

"""
Riot API handler sur-definition.
"""


class RateLimiter(riotwatcher.RateLimit):
    """Add a contextual management on the rate limiter, blocking request.
    """

    def __init__(self, *args, **kwargs):
        """Constructor. Create the lock on the request.
        """
        super(RateLimiter, self).__init__(*args, **kwargs)
        self._request_lock = threading.Lock()

    def __enter__(self):
        """Context management support. Forward to acquire.
        """
        self.acquire()

    def __exit__(self, unused_type, unused_value, unused_traceback):
        """Context management support. Forward to release.
        """
        self.release()

    def acquire(self):
        """Acquire the lock and wait until a request is available.
        """
        self._request_lock.acquire()
        while not self.request_available():
            time.sleep(0.1)

    def release(self):
        """Release the previously acquired lock.
        """
        self._request_lock.release()


class RiotAPIHandler(riotwatcher.RiotWatcher):
    """Adds support of request locking when the rate limit is reached.
    """

    def __init__(self, key, default_region="na", limits=None):
        """Constructor. Register the key and the rate limiters."""
        self.key = key
        self.default_region = default_region

        self.limits = limits
        if self.limits is None:
            self.limits = [RateLimiter(10, 10), RateLimiter(500, 600)]
        for limiter in self.limits:
            monitoring.FetcherWatcher.register_rate_limiter(limiter)

    def acquire(self):
        """Acquire the locks, and wait until a request is available"""
        for rate_limiter in self.limits:
            rate_limiter.acquire()

    def release(self):
        """Release the locks."""
        for rate_limiter in reversed(self.limits):
            rate_limiter.release()

    def base_request(self, *args, **kwargs):
        """Encapsulate the request inside a lock.

        Ensure the request respects the rate limit and release the lock even if
        the request raised an error.
        """
        self.acquire()

        try:
            result = super(RiotAPIHandler, self).base_request(*args, **kwargs)
        finally:
            self.release()

        return result
