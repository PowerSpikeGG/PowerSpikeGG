package(default_visibility = ["//visibility:public"])

load("@io_bazel_rules_go//go:def.bzl", "go_binary", "go_library")

go_library(
    name = "go_default_library",
    srcs = [
        "gateway.go",
        "match.go",
        "summoner.go",
    ],
    visibility = ["//visibility:private"],
    deps = [
        "//powerspikegg/rawdata/fetcher:service_gopb",
        "//powerspikegg/rawdata/public:leagueoflegends_gopb",
        "@com_github_golang_protobuf//jsonpb:go_default_library",
        "@com_github_golang_protobuf//proto:go_default_library",
        "@org_golang_google_grpc//:go_default_library",
    ],
)

go_binary(
    name = "go_gateway",
    library = ":go_default_library",
    visibility = ["//visibility:public"],
)
