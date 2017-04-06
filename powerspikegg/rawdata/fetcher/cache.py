import gflags
import logging
import pymongo

from functools import wraps
from bson.objectid import ObjectId

from powerspikegg.rawdata.fetcher import aggregator
from powerspikegg.rawdata.fetcher import monitoring
from powerspikegg.rawdata.public import constants_pb2

"""Riot API data caching management."""

FLAGS = gflags.FLAGS

gflags.DEFINE_string(
    "rawdata_cache_server_address",
    "localhost:27017",
    "address of the Mongo database caching the Riot API data.")
gflags.DEFINE_string(
    "rawdata_cache_database_name",
    "rawdata",
    "database name containing Riot API data.")
gflags.DEFINE_integer(
    "mongodb_connection_timeout",
    1000,
    "seconds before assuming the mongodb connection timeouts.")
gflags.DEFINE_boolean(
    "disable_mongodb_exception",
    False,
    "disable MongoDB exception propagation.")
gflags.DEFINE_integer(
    "mongodb_connection_retry",
    10,
    "maximum connection attempts to the mongo database.")


def _silent_connection_failure(func):
    """Decorator used to avoid raising an exception when the database timeouts

    Parameters:
        func: Function to decorate.
    """
    @wraps(func)
    def wrapper(*args, **kwargs):
        """Wraps the function to catch timeout exception.
        """
        if not FLAGS.disable_mongodb_exception:
            return func(*args, **kwargs)

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

    address = None
    database_name = None
    aggregator = aggregator

    def __init__(self):
        """Constructor. Initialize the client to the Mongo server."""
        if self.address is None:
            self.address = "mongodb://%s/" % FLAGS.rawdata_cache_server_address
        if self.database_name is None:
            self.database_name = FLAGS.rawdata_cache_database_name

        monitoring.MongoDBWatcher.register_server_address(self.address)
        monitoring.MongoDBWatcher.register_monitorable_collection(
            self.database_name, "matches")
        monitoring.MongoDBWatcher.register_monitorable_collection(
            self.database_name, "summoners")

        for _ in range(FLAGS.mongodb_connection_retry):
            self.client = self._connect(self.address)
            if self.client is not None:
                break
        else:
            logging.critical("Unable to reach the MongoDB server.")

    def _connect(self, address):
        """Set up a connection to the MongoDB server.

        Parameters:
            address: MongoDB server address.
        """
        client = pymongo.MongoClient(
            address, serverSelectionTimeoutMS=FLAGS.mongodb_connection_timeout)

        client[self.database_name].matches.create_index(
            [("matchId", pymongo.ASCENDING)],
            background=True,
            unique=True
        )

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
        matches = self.client[self.database_name].matches
        selector = {
            "matchId": match_request.id,
            "region": constants_pb2.Region.Name(match_request.region),
        }
        return matches.find_one(selector)

    @_silent_connection_failure
    def save_match(self, match_data):
        """Save a match in the cache database.

        Parameters:
            match_data: data to store.
        """
        matches = self.client[self.database_name].matches

        # Ensures key _id is dynamically managed
        match_data["_id"] = ObjectId()
        matches.insert_one(match_data)

    @_silent_connection_failure
    def find_summoner(self, summoner):
        """Find a summoner in the cache.

        Note this function can also be used as a test to know if a user is
        registered in the cache.

        Parameters:
            summoner: A constants_pb2.Summoner message containing partial
                information about the summoner.
        Returns:
            The corresponding summoner or None if not found.
        Raises:
            ValueError: If none of the summoner name or id is specified.
        """
        if not summoner.name and not summoner.id:
            raise ValueError("Either summoner's name or id is required.")

        selector = {"region": constants_pb2.Region.Name(summoner.region)}
        if summoner.name:
            selector["name"] = summoner.name
        if summoner.id:
            selector["id"] = summoner.id

        summoners = self.client[self.database_name].summoners
        return summoners.find_one(selector)

    @_silent_connection_failure
    def save_summoner(self, summoner_data, region):
        """Save a summoner in the cache.

        Parameters:
            summoner_data: A JSON containing summoner DTO as specified by the
                Riot API documentation [1].
            region: Region in which the summoner leaves. Not contained in the
                DTO, so must be specified.
        """
        # Ensures key _id is dynamically managed
        summoner_data["_id"] = ObjectId()
        summoner_data["region"] = constants_pb2.Region.Name(region)

        summoners = self.client[self.database_name].summoners
        summoners.insert_one(summoner_data)

    def query_matches_cache(self, query_pb):
        """Query the cache based on a query message.

        Parameters:
            query_pb: protocol buffer containing filters on the database.
        Returns:
            A generator containing matches matching the query.
        """
        matches = self.client[self.database_name].matches
        generator = self.aggregator.SearchMatchesMatchingQuery(
            matches, query_pb)
        for match in generator:
            yield match

    def average_stats(self, query_pb):
        """Aggregate the players statistics based on a query message.

        Parameters:
            query_pb: protocol buffer containing filters on matches.
        Returns:
            A JSON containing aggregated statistics.
        """
        matches = self.client[self.database_name].matches
        return self.aggregator.AverageStatisticsOnQuery(matches, query_pb)
