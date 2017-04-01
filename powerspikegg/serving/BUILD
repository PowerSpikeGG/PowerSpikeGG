package(default_visibility = ["//visibility:public"])

load("@protobuf//:protobuf.bzl", "cc_proto_library")
load("//powerspikegg:powerspikegg.bzl", "psgg_proto_library")

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
    name = "computation_service",
    srcs = ["src/match_computation.cc"],
    hdrs = ["src/match_computation.h"],
    deps = [
        ":match_computation_cc",
        "@grpc//:grpc++",
        "@tf_serving//tensorflow_serving/model_servers:server_core",
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
        ":match_computation_cc",
        ":server",
        "@gtest//:lib",
    ],
)
