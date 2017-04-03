# Raw data fetcher

load("//powerspikegg:powerspikegg.bzl", "psgg_proto_library")
load("@bazel_tools//tools/build_defs/docker:docker.bzl", "docker_build")
load("@subpar//:subpar.bzl", "par_binary")

docker_build(
    name = "docker",
    base = "@docker_python3//:image",
    entrypoint = [
        "python3",
        "./server.par",
    ],
    files = [
        ":server.par",
        "@pydep_requests//:certificates",
    ],
    ports = [
        "50001",  # Fetcher address
        "8002",  # Prometheus server
    ],
    visibility = ["//visibility:public"],
)

psgg_proto_library(
    name = "service",
    srcs = glob(["*.proto"]),
    has_services = 1,
    visibility = ["//visibility:public"],
    deps = [
        "//powerspikegg/rawdata/public:leagueoflegends",
    ],
)

par_binary(
    name = "server",
    srcs = [
        "server.py",
        ":service_py",
        "//powerspikegg/rawdata/public:leagueoflegends_py",
    ],
    deps = [
        ":cache",
        ":converter",
        ":handler",
        "//powerspikegg/lib/monitoring:rpc",
        "//third_party/python/requests:docker_certificates",
        "//third_party/python/riotwatcher",
        "@pydep_gflags//:library",
    ],
)

py_test(
    name = "server_test",
    srcs = [
        "server_test.py",
    ],
    deps = [
        ":aggregator_test",
        ":server",
        "//third_party/python/riotwatcher:rwmock",
        "@pydep_mock//:library",
    ],
)

py_library(
    name = "aggregator",
    srcs = [
        "aggregator.py",
    ],
)

py_test(
    name = "aggregator_test",
    srcs = [
        "aggregator_test.py",
        ":service_py",
        "//powerspikegg/rawdata/public:leagueoflegends_py",
    ],
    deps = [
        ":aggregator",
        "//powerspikegg/lib/mongodb:wrapper",
    ],
)

py_library(
    name = "cache",
    srcs = [
        "cache.py",
        ":service_py",
        "//powerspikegg/rawdata/public:leagueoflegends_py",
    ],
    deps = [
        ":aggregator",
        ":monitoring",
        "@pydep_gflags//:library",
        "@pydep_pymongo//:library",
    ],
)

py_test(
    name = "cache_test",
    srcs = [
        "cache_test.py",
    ],
    deps = [
        ":aggregator_test",
        ":cache",
        "//powerspikegg/lib/mongodb:wrapper",
        "//third_party/python/riotwatcher:rwmock",
        "@pydep_mock//:library",
    ],
)

py_library(
    name = "monitoring",
    srcs = [
        "monitoring.py",
    ],
    deps = [
        "//powerspikegg/lib/monitoring:watcher",
        "@pydep_prometheus_client//:library",
        "@pydep_pymongo//:library",
    ],
)

py_test(
    name = "monitoring_test",
    srcs = [
        "monitoring_test.py",
    ],
    deps = [
        ":handler",
        ":monitoring",
        "//powerspikegg/lib/mongodb:wrapper",
    ],
)

py_library(
    name = "handler",
    srcs = [
        "handler.py",
    ],
    deps = [
        ":monitoring",
        "//third_party/python/riotwatcher",
    ],
)

py_test(
    name = "handler_test",
    srcs = [
        "handler_test.py",
    ],
    deps = [
        ":handler",
    ],
)

py_library(
    name = "converter",
    srcs = [
        "converter.py",
        ":service_py",
        "//powerspikegg/rawdata/public:leagueoflegends_py",
    ],
    deps = [
        "//powerspikegg/rawdata/lib/python:static",
    ],
)

py_test(
    name = "converter_test",
    srcs = [
        "converter_test.py",
        "//powerspikegg/rawdata/public:leagueoflegends_py",
    ],
    deps = [
        ":aggregator_test",
        ":converter",
        "//powerspikegg/rawdata/lib/python:static",
        "//third_party/python/riotwatcher:rwmock",
    ],
)
