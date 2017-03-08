import gflags
import unittest

from prometheus_client import core

from powerspikegg.lib.monitoring import rpc


FLAGS = gflags.FLAGS


class TestRPCCounter(unittest.TestCase):
    """Tests the RPCMonitoring decorator works correctly."""

    @classmethod
    def setUpClass(self):
        """Forces flags to enable prometheus."""
        FLAGS(['program', '--enable_prometheus'])

    def get_counters_values(self, endpoint):
        """Gets the counters values for an endpoint."""
        return [
            core.REGISTRY.get_sample_value(
                'rpc_endpoint', {'rpc': endpoint, 'type': 'calls'}),
            core.REGISTRY.get_sample_value(
                'rpc_endpoint', {'rpc': endpoint, 'type': 'success'}),
            core.REGISTRY.get_sample_value(
                'rpc_endpoint', {'rpc': endpoint, 'type': 'errors'}),
        ]

    def test_rpc_call_correctly_incremented(self):
        """Checks counters are incremented base on the function behavior."""
        @rpc.endpoint_monitoring()
        def MyEndpoint(raise_exception=False):
            if raise_exception:
                raise Exception("Woops!")
            return None

        start_call, start_success, start_error = self.get_counters_values(
            'MyEndpoint')
        print(start_call)

        MyEndpoint()
        call, success, error = self.get_counters_values('MyEndpoint')
        print(call, success, error)
        self.assertEqual(1, call - start_call)
        self.assertEqual(1, success - start_success)
        self.assertEqual(0, error - start_error)

        with self.assertRaises(Exception):
            MyEndpoint(True)
        call, success, error = self.get_counters_values('MyEndpoint')
        self.assertEqual(2, call - start_call)
        self.assertEqual(1, success - start_success)
        self.assertEqual(1, error - start_error)


if __name__ == "__main__":
    unittest.main()
