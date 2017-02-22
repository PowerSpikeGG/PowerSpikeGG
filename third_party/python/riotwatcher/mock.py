import json
import mock
import os

"""Test utility containing a mock of some functions of the Riot Watcher."""


class _Samples(object):
    """Creates a container loading samples in memory."""

    _loaded_samples = {}
    _default_samples = {
        "match": "match.json",
        "match_list": "match_list.json",
        "summoner": "summoner.json",
    }

    def __init__(self):
        """Constructor. Loads properties of the class."""
        for name, filename in self._default_samples.items():
            setattr(self, name, property(self.get(filename)))

    def __getitem__(self, key):
        """Equivalent of class[key]. See method `get` for more information."""
        return self.get(key)

    def get(self, key):
        """Loads a file in memory and returns loaded JSON file.

        Parameters:
            key: name of the sample to load.
        Returns:
            A decoded JSON object containing the sample data.
        Raises:
            KeyError: If the sample identifier does not exists.
        """
        if key not in self._default_samples:
            return KeyError(str(key))

        filename = self._default_samples[key]
        if filename not in self._loaded_samples:
            this_path = os.path.dirname(os.path.realpath(__file__))
            with open(os.sep.join([this_path, "samples", filename])) as f:
                self._loaded_samples[filename] = json.load(f)

        return self._loaded_samples[filename]


SAMPLES = _Samples()


def _mock_method_returning_samples(sample_id):
    """Create a mock method returning a sample by default."""
    mock_method = mock.Mock()

    def side_effect(*args, **kwargs):
        """Loads the sample file if and only if the mock is called."""
        if not isinstance(mock_method.return_value, mock.Mock):
            # Return value was already set, so samples has already been parsed
            # or the user might changed it.
            return mock.DEFAULT

        mock_method.return_value = SAMPLES.get(sample_id)
        return mock.DEFAULT

    # Register the mock hook
    mock_method.side_effect = side_effect
    return mock_method


class RiotWatcherMock(object):
    """Class utility for tests mocking the Riot Watcher behavior."""

    # Mapping of the method name to the sample names.
    methods_samples = {
        "get_match": "match",
        "get_match_list": "match_list",
        "get_summoner": "summoner",
    }

    def __init__(self, *args, **kwargs):
        """Constructor. Creates the mock methods."""
        self.given_args = args
        self.given_kwargs = kwargs

        # Mock methods are created here to avoid making them class attribute.
        # This ensures that every time the RiotWatcherMock is instantiated,
        # mock are completely reseted.
        for method, sample_name in self.methods_samples.items():
            setattr(self, method, _mock_method_returning_samples(sample_name))
