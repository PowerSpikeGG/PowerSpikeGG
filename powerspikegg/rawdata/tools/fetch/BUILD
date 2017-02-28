load("@io_bazel_rules_go//go:def.bzl", "go_binary", "go_library", "go_test")

go_library(
    name = "go_default_library",
    srcs = [
        "base.go",
        "fetch.go",
        "match.go",
        "summoner.go",
    ],
    visibility = ["//visibility:private"],
    deps = [
        "//powerspikegg/rawdata/fetcher:service_gopb",
        "//powerspikegg/rawdata/public:leagueoflegends_gopb",
        "@com_github_golang_protobuf//proto:go_default_library",
        "@com_github_google_subcommands//:go_default_library",
        "@org_golang_google_grpc//:go_default_library",
    ],
)

go_binary(
    name = "fetch",
    library = ":go_default_library",
    visibility = ["//visibility:public"],
)

go_test(
    name = "go_default_test",
    srcs = ["match_test.go"],
    library = ":go_default_library",
    deps = [
        "//powerspikegg/rawdata/fetcher:service_gopb",
        "//powerspikegg/rawdata/public:leagueoflegends_gopb",
        "@com_github_golang_protobuf//proto:go_default_library",
        "@com_github_google_subcommands//:go_default_library",
        "@org_golang_google_grpc//:go_default_library",
        "@org_golang_google_grpc//reflection:go_default_library",
        "@org_golang_x_net//context:go_default_library",
    ],
)
