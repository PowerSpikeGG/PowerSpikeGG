package(default_visibility = ["//visibility:public"])

load("@bazel_tools//tools/build_defs/docker:docker.bzl", "docker_build")
load("@protobuf//:protobuf.bzl", "cc_proto_library")
load("@bazel_tools//tools/build_defs/docker:docker.bzl", "docker_build")
load("//powerspikegg:powerspikegg.bzl", "psgg_proto_library")

docker_build(
    name = "docker",
    base = "@docker_debian_pkg//:image",
    directory = "/bin",
    entrypoint = ["/bin/main"],
    files = [":main"],
    ports = ["50051"],
    visibility = ["//visibility:public"],
)

cc_binary(
    name = "main",
    srcs = ["src/main.cc"],
    deps = [":server"],
)

cc_library(
    name = "server",
    srcs = ["src/server.cc"],
    hdrs = ["src/server.h"],
    deps = [":computation_service"],
)

cc_library(
    name = "converter",
    srcs = ["src/converter.cc"],
    hdrs = ["src/converter.h"],
    deps = [
        ":match_computation_cc",
        "//powerspikegg/rawdata/public:leagueoflegends_cc",
    ],
)

cc_library(
    name = "computation_service",
    srcs = ["src/match_computation.cc"],
    hdrs = ["src/match_computation.h"],
    deps = [
        ":converter",
        ":match_computation_cc",
        "//external:gflags",
        "//powerspikegg/computation_models/utils",
        "@grpc//:grpc++",
        "@org_tensorflow//tensorflow/cc:cc_ops",
    ],
)

psgg_proto_library(
    name = "match_computation",
    srcs = [
        "public/match_computation.proto",
    ],
    deps = [
        "//powerspikegg/rawdata/public:leagueoflegends",
    ],
)

cc_test(
    name = "grpc_interface",
    srcs = [
        "test/grpc_interface.cc",
    ],
    linkstatic = 1,
    deps = [
        ":converter",
        ":server",
        "@gtest//:lib",
    ],
)
