# PowerSpikeGG Bazel utilities.
#
# This file contains generic utilities for compilation. Any additionnal
# constants, functions or rules should be defined here, in order to be
# included in BUILD files.

load("@org_pubref_rules_protobuf//python:rules.bzl", "py_proto_compile")
load("@org_pubref_rules_protobuf//go:rules.bzl", "go_proto_library")
load("@org_pubref_rules_protobuf//java:rules.bzl", "java_proto_library")
load("@tf_serving//tensorflow_serving:serving.bzl", "serving_proto_library")

DEFAULT_PROTO_VISIBILITY = ["//visibility:public"]

def _psgg_proto_library_py(name, srcs=[], deps=[], visibility=[],
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

def _psgg_proto_library_go(name, srcs=[], deps=[], has_services=0, visibility=[], testonly=0):
    """Generates a Go proto library"""
    godeps = [dep + "_gopb" for dep in deps]

    go_proto_library(
        name=name + "_gopb",
        protos=srcs,
        proto_deps=godeps,
        testonly=testonly,
        with_grpc=True,
        visibility=visibility,
    )

def _psgg_proto_library_java(name, srcs=[], deps=[], visibility=[], testonly=0):
    """Compiles a protocol buffer into a Java API."""
    protodeps = [dep + "_protos" for dep in deps]

    java_proto_library(
        name = name + "_java",
        protos = srcs + protodeps,
        visibility=visibility,
        with_grpc = True
    )

def _psgg_proto_library_cc(name, srcs=[], deps=[], visibility=[], testonly=0):
    """Compiles a proto file to a c++ library."""
    cc_deps = [dep + "_cc" for dep in deps]

    serving_proto_library(
        name=name+"_cc",
        srcs=srcs,
        deps=cc_deps,
        cc_grpc_version=2,
        visibility=visibility 
    ) 

def psgg_proto_library(name, srcs=[], deps=[], has_services=0, visibility=[], testonly=0):
    """PowerSpikeGG proto library generic compilation rule."""
    if visibility == []:
        visibility = DEFAULT_PROTO_VISIBILITY

    native.filegroup(
        name=name + "_protos",
        srcs=srcs,
    )

    _psgg_proto_library_py(
        name=name,
        srcs=srcs,
        deps=deps,
        testonly=testonly,
        visibility=visibility,
    )

    _psgg_proto_library_go(
        name=name,
        srcs=srcs,
        deps=deps,
        has_services=has_services,
        testonly=testonly,
        visibility=visibility,
    )

    _psgg_proto_library_java(
        name=name,
        srcs=srcs,
        deps=deps,
        visibility=visibility
    )

    _psgg_proto_library_cc(
        name=name,
        srcs=srcs,
        deps=deps,
        visibility=visibility
    )
