import unittest

from powerspikegg.rawdata.lib.python import static
from powerspikegg.rawdata.public import constants_pb2

"""
Test suite for the static converter helper.
"""


class StaticConverter(unittest.TestCase):
    """Checks if the static field converter works correctly.
    """

    def test_map_conversion(self):
        """Test the conversion from queue type name to enumerator."""
        tests = [
            (11, constants_pb2.SUMMONER_RIFT),
        ]

        for map_id, expected in tests:
            self.assertEqual(static.get_map_from_id(map_id), expected)

        with self.assertRaises(ValueError):
            static.get_map_from_id(100)


if __name__ == "__main__":
    unittest.main()
