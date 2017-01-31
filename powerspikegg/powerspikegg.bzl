# PowerSpikeGG Bazel utilities.
#
# This file contains generic utilities for compilation. Any additionnal
# constants, functions or rules should be defined here, in order to be
# included in BUILD files.

load("@org_pubref_rules_protobuf//python:rules.bzl", "py_proto_compile")

DEFAULT_PROTO_VISIBILITY = ["//visibility:public"]

def _psgg_proto_library_py(name, srcs=[], protodeps=[], deps=[], visibility=[],
                          testonly=0):
    """Compiles a protocol buffer into a Python API."""
    pydeps = [dep + "_py" for dep in deps]

    py_proto_compile(
        name=name + "_py",
        protos=srcs,
        deps=pydeps,
        visibility=visibility,
        testonly=testonly,
    )

def psgg_proto_library(name, srcs=[], deps=[], visibility=[], testonly=0):
    """PowerSpikeGG proto library generic compilation rule."""
    if visibility == []:
        visibility = DEFAULT_PROTO_VISIBILITY

    _psgg_proto_library_py(
        name=name,
        srcs=srcs,
        deps=deps,
        testonly=testonly,
        visibility=visibility,
    )
