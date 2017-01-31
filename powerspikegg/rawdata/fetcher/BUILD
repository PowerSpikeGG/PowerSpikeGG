# Raw data fetcher

load("//powerspikegg:powerspikegg.bzl", "psgg_proto_library")

filegroup(
    name="protos",
    srcs=glob(["*.proto"]),
)

psgg_proto_library(
    name="service",
    srcs=[
        ":protos",
    ],
    deps=[
        "//powerspikegg/rawdata/public:leagueoflegends",
    ],
    visibility=["//visibility:public"],
)

py_binary(
    name="server",
    srcs=[
        "server.py",
        ":service_py",
        "//powerspikegg/rawdata/public:leagueoflegends_py",
    ],
    deps=[
        ":converter",
        ":handler",
        ":cache",
        "//third_party/python/riotwatcher",
        "@pydep_gflags//:library",
    ],
)

py_test(
    name="server_test",
    srcs=[
        "server_test.py",
    ],
    deps=[
        ":server",
        "@pydep_mock//:library",
    ],
    data=[
        "//powerspikegg/rawdata/fetcher/samples",
    ],
)

py_library(
    name="cache",
    srcs=[
        "cache.py",
        ":service_py",
        "//powerspikegg/rawdata/public:leagueoflegends_py",
    ],
    deps=[
        "@pydep_pymongo//:library",
    ],
)

py_test(
    name="cache_test",
    srcs=[
        "cache_test.py",
    ],
    deps=[
        ":cache",
        "@pydep_mockupdb//:library",
    ],
)

py_library(
    name="handler",
    srcs=[
        "handler.py",
    ],
    deps=[
        "//third_party/python/riotwatcher",
    ],
)

py_test(
    name="handler_test",
    srcs=[
        "handler_test.py",
    ],
    deps=[
        ":handler",
    ],
)

py_library(
    name="converter",
    srcs=[
        "converter.py",
        "//powerspikegg/rawdata/public:leagueoflegends_py",
    ],
    deps=[
        "//powerspikegg/rawdata/lib/python:static",
    ],
)

py_test(
    name="converter_test",
    srcs=[
        "converter_test.py",
        "//powerspikegg/rawdata/public:leagueoflegends_py",
    ],
    deps=[
        ":converter",
        "//powerspikegg/rawdata/lib/python:static",
        "@pydep_mockupdb//:library",
    ],
    data=[
        "//powerspikegg/rawdata/fetcher/samples",
    ],
)
