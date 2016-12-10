import gflags
import logging
import pymongo

from functools import wraps

from powerspikegg.rawdata.public import constants_pb2

"""Riot API data caching management."""

FLAGS = gflags.FLAGS

gflags.DEFINE_string("rawdata_cache_server_address", "localhost:27017",
    "address of the Mongo database caching the Riot API data.")
gflags.DEFINE_string("rawdata_cache_database_name", "rawdata",
    "database name containing Riot API data.")
gflags.DEFINE_integer("mongodb_connection_timeout", 1,
    "seconds before assuming the mongodb connection timeouts.")


def _silent_connection_failure(func):
    """Decorator used to avoid raising an exception when the database timeouts

    Parameters:
        func: Function to decorate.
    """
    @wraps(func)
    def wrapper(*args, **kwargs):
        """Wraps the function to catch timeout exception.
        """
        try:
            result = func(*args, **kwargs)
        except pymongo.errors.ServerSelectionTimeoutError as e:
            logging.error("Unable to reach the caching server: %s", e)
            return None
        return result

    return wrapper


class CacheManager:
    """Cache system abstraction for the server.

    Uses a Mongo DB instance to store matches.
    """

    MAX_CONNECTION_ATTEMPTS = 1
    address = None

    def __init__(self, lazy_connection=False):
        """Constructor. Initialize the client.

        Parameters:
            lazy_connection: avoid testing if the connection is working while
                initializing it.
        """
        if self.address is None:
            self.address = "mongodb://%s/" % FLAGS.rawdata_cache_server_address

        for _ in range(self.MAX_CONNECTION_ATTEMPTS):
            self.client = self._connect(self.address, lazy_connection)
            if self.client is not None:
                break
        else:
            logging.critical("Unable to reach the MongoDB server.")

    def _connect(self, address, lazy_connection=False):
        """Set up a connection to the MongoDB server.

        Parameters:
            address: MongoDB server address.
            lazy_connection: avoid testing if the connection is working while
                initializing it.
        """
        client = pymongo.MongoClient(address,
            serverSelectionTimeoutMS=FLAGS.mongodb_connection_timeout)
        if lazy_connection:
            return client

        # Send a query to the server to see if the connection is working.
        try:
            client.server_info()
        except pymongo.errors.ServerSelectionTimeoutError as e:
            logging.error("Unable to connect to %s.", address)
            client = None

        return client

    @_silent_connection_failure
    def find_match(self, match_request):
        """Find a match in the cache.

        Parameters:
            match_request: A MatchRequest containing match id and region.
        Returns:
            The corresponding match or None if not found.
        """
        matches = self.client[FLAGS.rawdata_cache_database_name].matches
        return matches.find_one({
            "matchId": match_request.id,
            "region": constants_pb2.Region.Name(match_request.region),
        })

    @_silent_connection_failure
    def save_match(self, match_data):
        """Save a match in the cache database.

        Parameters:
            match_data: data to store.
        """
        matches = self.client[FLAGS.rawdata_cache_database_name].matches
        matches.insert_one(match_data)
