import gflags

"""
Utility module used by the requests module to find the SSL certificates.

Please check (certs.py)[1] for more informations.

  [1]: https://github.com/kennethreitz/requests/blob/master/requests/certs.py
"""


def where():
    """Function used by requests to locate the certificates.

    Returns:
        The filepath to the SSL CA certificates.
    """
    # TODO(funkysayu): That would be great to find a way to move this as a flag
    return "/cacert.pem"
