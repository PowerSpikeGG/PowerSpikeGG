import json
import requests
import sys
import threading
import time
import unittest

if sys.version_info > (3, 0):
    from http.server import HTTPServer
    from http.server import SimpleHTTPRequestHandler
else:
    from BaseHTTPServer import HTTPServer
    from SimpleHTTPServer import SimpleHTTPRequestHandler

from powerspikegg.rawdata.fetcher.handler import RateLimiter
from powerspikegg.rawdata.fetcher.handler import RiotAPIHandler


class FakeRiotAPIRequestHandler(SimpleHTTPRequestHandler):
    """Fake HTTP server, serving dummy json data."""

    def do_GET(self):
        """Serve the data."""
        self.send_response(200)
        self.end_headers()
        self.wfile.write(json.dumps({"somekey": "somedata"}).encode("ascii"))


class LocalRiotAPIHandler(RiotAPIHandler):
    """Override the url formater to target the local http server."""

    server_address = None

    def base_request(self, url, region, static=False, **kwargs):
        """Re-define the base request to reach the local server."""
        self.acquire()
        response = requests.get('http://{server_address}/{url}'.format(
            server_address=self.server_address,
            url=url,
        ))

        for limit in self.limits:
            limit.add_request()

        self.release()
        return response.json()


class RateLimiterTest(unittest.TestCase):
    """Check if the contextual rate limiter correctly block requests when the
    rate limit is reached."""

    def test_one_request(self):
        """Simple test checking if one request can be sent without issues"""
        limiter = RateLimiter(10, 10)
        with limiter:
            limiter.add_request()
        self.assertTrue(limiter.request_available)

    def test_blocking_requests(self):
        """Checks if when we reach the rate limit the limiter is blocking.

        We limit to n request per second and then do n+1 request. The time
        should be above 1s.
        """
        limiter = RateLimiter(2, 0.1)  # 2 requests per 0.1 seconds

        start_time = time.time()
        for _ in range(3):
            with limiter:
                limiter.add_request()
        stop_time = time.time()

        self.assertGreaterEqual(stop_time - start_time, 0.1)

    def test_non_contextual_blocking(self):
        """Checks if the non contextual blocking works correctly."""
        limiter = RateLimiter(1, 0.1)

        start_time = time.time()
        limiter.acquire()
        limiter.add_request()
        limiter.release()
        limiter.acquire()
        limiter.add_request()
        limiter.release()
        stop_time = time.time()

        self.assertGreaterEqual(stop_time - start_time, 0.1)

    def test_multi_thread_blocking(self):
        """In a multithreaded environment, the requests should still be blocked
        if exceding the quota."""
        limiter = RateLimiter(3, 0.5)

        def thread_target():
            with limiter:
                limiter.add_request()

        threads = [threading.Thread(target=thread_target) for _ in range(4)]
        start_time = time.time()
        for thread in threads:
            thread.start()
        for thread in threads:
            thread.join()
        stop_time = time.time()

        self.assertGreaterEqual(stop_time - start_time, 0.5)

    def test_multi_thread_non_blocking(self):
        """If the rate limit is not exceded, check if the requests are not
        blocked."""
        limiter = RateLimiter(4, 1)

        def thread_target():
            with limiter:
                limiter.add_request()

        threads = [threading.Thread(target=thread_target) for _ in range(4)]
        start_time = time.time()
        for thread in threads:
            thread.start()
        for thread in threads:
            thread.join()
        stop_time = time.time()

        self.assertLess(stop_time - start_time, 1)


class RiotAPIHandlerTest(unittest.TestCase):
    """Test the auto-rate limiting is fully supported."""

    server_address = ("localhost", 50923)
    handler = FakeRiotAPIRequestHandler

    @classmethod
    def setUpClass(cls):
        """Create and serve a fake HTTP server."""
        cls.httpd = HTTPServer(cls.server_address, cls.handler)
        cls.running_thread = threading.Thread(target=cls.httpd.serve_forever)
        cls.running_thread.start()

    @classmethod
    def tearDownClass(cls):
        """Close the fake HTTP server."""
        cls.httpd.shutdown()
        cls.httpd.server_close()
        cls.running_thread.join()

    def test_one_request(self):
        """Try to send one request with normal rate limiting."""
        client = LocalRiotAPIHandler("some random token")
        client.server_address = "%s:%s" % self.server_address

        start = time.time()
        client.get_match(4242)
        self.assertLess(time.time() - start, 1)

    def test_two_requests(self):
        """Try to send two requests with normal rate limiting."""
        client = LocalRiotAPIHandler("some random token")
        client.server_address = "%s:%s" % self.server_address

        start = time.time()
        client.get_match(4242)
        client.get_match(4242)
        self.assertLess(time.time() - start, 1)

    def test_too_much_requests(self):
        """Try to send too many requests."""
        client = LocalRiotAPIHandler("some random token",
            limits=[RateLimiter(2, 0.5)])  # 2 requests per 0.5 seconds.
        client.server_address = "%s:%s" % self.server_address

        start = time.time()
        for _ in range(3):
            client.get_match(4242)
        self.assertGreaterEqual(time.time() - start, 0.5)

    def test_multi_thread(self):
        """Try to send requests in a multi-threaded context."""
        client = LocalRiotAPIHandler("some random token",
            limits=[RateLimiter(2, 0.5)])
        client.server_address = "%s:%s" % self.server_address

        def run():
            client.get_match(4242)

        threads = [threading.Thread(target=run) for _ in range(2)]
        start = time.time()
        for thread in threads:
            thread.start()
        for thread in threads:
            thread.join()
        self.assertLess(time.time() - start, 0.5)

    def test_too_much_multi_thread(self):
        """Try to send too many requests in a multi-threaded context."""
        client = LocalRiotAPIHandler("some random token",
            limits=[RateLimiter(2, 0.5)])
        client.server_address = "%s:%s" % self.server_address

        def run():
            client.get_match(4242)

        threads = [threading.Thread(target=run) for _ in range(3)]
        start = time.time()
        for thread in threads:
            thread.start()
        for thread in threads:
            thread.join()
        self.assertGreaterEqual(time.time() - start, 0.5)


if __name__ == "__main__":
    unittest.main()
