import socket
import os
import pymongo
import shutil
import socket
import subprocess
import sys
import tempfile
import warnings
import time

try:
    from urllib.parse import quote_plus  # Python 3.x
except ImportError:
    from urllib import quote_plus  # Python 2.x

MONGO_SERVER_VERSION = "3.4.1"
MONGO_SERVER_REPOSITORY_NAME = "com_mongodb_binary"
FOLDER_LEVEL_TO_WORKSPACE = 3
MAX_INSTANTATION_ATTEMPT = 3

def _pick_unused_port():
    """Find an unused port on the system and returns it.

    Snippet takken from http://code.activestate.com/recipes/531822/
    """
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind(('localhost', 0))
    addr, port = s.getsockname()
    s.close()
    return port

class _MongoProcessContext():
    """Contains the mongo server process context."""

    def __init__(self):
        """Creates a context for the process."""
        self.port = _pick_unused_port()
        self.runtime_dir = tempfile.mkdtemp()
        self.pid_path = self.runtime_dir + "/pid"
        self.data_path = tempfile.mkdtemp(prefix=self.runtime_dir)

    def cleanup(self):
        """Clean any previously created files on the file system."""
        try:
            shutil.rmtree(self.runtime_dir)
        except OSError:
            # Silent this error. Most of the time, the directory is already
            # deleted.
            pass

class MongoDBServer():
    """Wrapper on top of a MongoDB server."""

    def __init__(self, process, process_context, connections_attempts=5):
        """Creates a client to the server, ensuring the server is reachable.

        Arguments:
            process: subprocess.Popen object wrapping the server process
            process_context: set of arguments passed to the server
            connections_attempts: number of try before assuming server is
                unreachable
        Raises:
            RuntimeError: if the server is unreachable.
        """
        self.process = process
        self.process_context = process_context

        # Get a client to the server, and ensures it works correctly.
        for _ in range(connections_attempts):
            self.client = self._instantiate_client()
            if self.client is not None:
                break
        else:
            raise RuntimeError("Unable to reach the server on port %s" %
                self.port)

    def _instantiate_client(self):
        """Create a client to the server.

        Returns:
            A pymongo client able to reach the server, None else.
        """
        client = pymongo.MongoClient("mongodb://127.0.0.1:%s" % self.port,
            serverSelectionTimeoutMS=1)
        try:
            client.server_info()
            return client
        except pymongo.errors.ServerSelectionTimeoutError as e:
            return None

    @property
    def port(self):
        """Returns the server port."""
        return self.process_context.port

    @property
    def address(self):
        """Returns the server address."""
        return "127.0.0.1:%s" % self.process_context.port

    def shutdown(self):
        """Shutdown the process and clean the context."""
        self.process.terminate()
        time.sleep(0.3)
        if self.process.poll() is None:
            self.process.kill()
        self.process.wait()

        self.process_context.cleanup()


def _get_binary_path():
    """Resolv the path to the mongod binary.

    Returns:
        A string to the Mongo DB server binary.
    """
    this_directory = os.path.dirname(os.path.abspath(__file__))
    workspace = os.path.normpath(os.sep.join(
        [this_directory] + [".."] * FOLDER_LEVEL_TO_WORKSPACE))

    return os.sep.join([
        workspace,
        "external",
        MONGO_SERVER_REPOSITORY_NAME,
        "mongodb-linux-x86_64-%s" % MONGO_SERVER_VERSION,
        "bin",
        "mongod",
    ])

def _instantiate(*cmd_args, **cmd_kwargs):
    """Instantiates the server.

    NOTE: This function might have side effects due to race condition: the
    port is picked up on the Python side and then passed to the server by
    command line. Another application may run on this port before the
    server starts listening!

    Arguments:
        cmd_args: Command line arguments without values (e.g. nounixsocket)
        cmd_kwargs: Command line arguments with values
    Returns:
        The process and the process context of the server.
    """
    # Create the context and pass it as arguments
    context = _MongoProcessContext()
    cmd_kwargs["port"] = context.port
    cmd_kwargs["pidfilepath"] = context.pid_path
    cmd_kwargs["dbpath"] = context.data_path

    command = [_get_binary_path()]
    command += ["--%s" % a for a in cmd_args]
    command += ["--%s=%s" % (k, v) for k, v in cmd_kwargs.items()]

    process = subprocess.Popen(command, stdout=sys.stdout)
    return process, context

def create_mongo_server(*cmd_args, **cmd_kwargs):
    """Instantiate the Mongo server.

    Arguments:
        cmd_args: Eventual command line arguments without values to pass to
                  the server binary
        cmd_kwargs: Eventual command line arguments with values to pass to
                    the server binary
    Raises:
        RuntimeError: if unable to start the server after several attempts.
    Returns:
        A MongoDBServer instance containing interface to the mongo db server.
    """
    # _instantiate may have some race conditions. Ensure we tried several
    # time before raising an error.
    for attempt in range(MAX_INSTANTATION_ATTEMPT):
        process, context = _instantiate(*cmd_args, **cmd_kwargs)
        try:
            return MongoDBServer(process, context)
        except RuntimeError:  # Cleanup before re-trying
            process.kill()
            process.wait()
            context.cleanup()

    raise RuntimeError("Unable to start the mongo server.")
