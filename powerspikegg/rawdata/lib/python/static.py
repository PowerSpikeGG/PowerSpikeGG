from powerspikegg.rawdata.public import constants_pb2

"""
Helper functions to convert LoL constants to protocol buffer constants.
"""

_MAP_ID_CORRESPONDANCE = {
    11: constants_pb2.SUMMONER_RIFT,
}


def get_map_from_id(map_id):
    """Convert a map id to a valid Map enumerator value.

    Parameters:
        map_id: string containing the map id.
    Returns:
        An enumerator value corresponding to the id.
    Raises:
        ValueError: if the map id is unsupported or invalid.
    """
    enumerator_value = _MAP_ID_CORRESPONDANCE.get(map_id, None)

    if enumerator_value is None:
        raise ValueError("Invalid/unsupported map ID.")

    return enumerator_value
