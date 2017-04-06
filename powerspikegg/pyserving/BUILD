package(default_visibility = ["//visibility:public"])

load("@bazel_tools//tools/build_defs/docker:docker.bzl", "docker_build")
load("@subpar//:subpar.bzl", "par_binary")

py_binary(
    name = "server",
    srcs = [
        "server.py",
        "//powerspikegg/rawdata/public:leagueoflegends_py",
        "//powerspikegg/serving:match_computation_py",
    ],
    deps = [
        "//powerspikegg/computation_models/fetcher",
        "//powerspikegg/computation_models/match:train",
        "@pydep_gflags//:library",
    ],
)

# FIXME(funkysayu): Find a proper docker
par_binary(
    name = "server_par",
    srcs = [
        "server.py",
        "//powerspikegg/rawdata/public:leagueoflegends_py",
        "//powerspikegg/serving:match_computation_py",
    ],
    main = "server.py",
    deps = [
        "//powerspikegg/computation_models/fetcher",
        "//powerspikegg/computation_models/match:train",
        "@pydep_gflags//:library",
    ],
)

docker_build(
    name = "docker",
    base = "@docker_tensorflow//:image",
    entrypoint = [
        "/server_par.par",
    ],
    files = [
        ":server_par.par",
        "@pydep_requests//:certificates",
    ],
    ports = [
        "50001",  # Fetcher address
    ],
)

py_test(
    name = "server_test",
    srcs = [
        "server_test.py",
        "//powerspikegg/rawdata/public:leagueoflegends_py",
        "//powerspikegg/serving:match_computation_py",
    ],
    deps = [
        ":server",
        "//powerspikegg/rawdata/fetcher:converter",
        "//third_party/python/riotwatcher:rwmock",
        "@pydep_gflags//:library",
        "@pydep_mock//:library",
    ],
)
