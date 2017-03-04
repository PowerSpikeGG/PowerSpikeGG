load("@io_bazel_rules_go//go:def.bzl", "go_binary", "go_library")

go_library(
    name = "go_default_library",
    srcs = ["populator.go"],
    visibility = ["//visibility:private"],
    deps = [
        "//powerspikegg/rawdata/fetcher:service_gopb",
        "//powerspikegg/rawdata/public:leagueoflegends_gopb",
        "@com_github_oleiade_lane//:go_default_library",
        "@com_github_op_go_logging//:go_default_library",
        "@org_golang_google_grpc//:go_default_library",
        "@org_golang_x_net//context:go_default_library",
    ],
)

go_binary(
    name = "populator",
    library = ":go_default_library",
    visibility = ["//visibility:public"],
)
