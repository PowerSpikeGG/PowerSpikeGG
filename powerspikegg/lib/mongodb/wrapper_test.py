import unittest

from powerspikegg.lib.mongodb import wrapper

class MongoStartupTest(unittest.TestCase):
    """Checks the mongodb server starts correctly through the wrapper."""

    def setUp(self):
        """For each tests, create a server available in instance variable"""
        self.server = wrapper.create_mongo_server()

    def tearDown(self):
        """Ensures the previously created server is shutdown correctly."""
        try:
            self.server.shutdown()
        except RuntimeError:
            pass

    def test_pid_startup_shutdown(self):
        """Ensures the server starts and shutdown correctly.

        Test done by checking the state of the process through the subprocess
        API."""
        self.assertIsNone(self.server.process.poll(),
            "Process exited with return code %s; expected it to run." %
            self.server.process.returncode)

        self.server.shutdown()
        self.assertIsNotNone(self.server.process.poll(),
            "Process didn't exit; expected the shutdown.")

    def test_client_connect(self):
        """Ensures a client can be generated and is able to reach the server"""
        client = self.server.client
        self.assertIsNotNone(client, "Client is None.")
        try:
            client.server_info()
        except pymongo.errors.ServerSelectionTimeoutError as e:
            self.fail("Client is not connected to the server.")


if __name__ == "__main__":
    unittest.main()
