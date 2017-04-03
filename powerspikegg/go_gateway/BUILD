load("@io_bazel_rules_go//go:def.bzl", "go_binary", "go_library", "go_test")
load("@bazel_tools//tools/build_defs/docker:docker.bzl", "docker_build")

go_library(
    name = "go_default_library",
    srcs = [
        "aggregation.go",
        "computation.go",
        "gateway.go",
        "match.go",
        "summoner.go",
    ],
    deps = [
        "//powerspikegg/rawdata/fetcher:service_gopb",
        "//powerspikegg/rawdata/public:leagueoflegends_gopb",
        "//powerspikegg/serving:match_computation_gopb",
        "@com_github_golang_protobuf//jsonpb:go_default_library",
        "@org_golang_google_grpc//:go_default_library",
        "@org_golang_x_net//context:go_default_library",
    ],
)

go_binary(
    name = "go_gateway",
    library = ":go_default_library",
    visibility = ["//visibility:public"],
)

docker_build(
    name = "docker",
    base = "@docker_debian//:image",
    directory = "/bin",
    entrypoint = ["/bin/go_gateway"],
    files = [":go_gateway"],
    ports = ["8080"],
    visibility = ["//visibility:public"],
)

go_test(
    name = "go_default_test",
    srcs = ["gateway_test.go"],
    library = ":go_default_library",
    deps = [
        "//powerspikegg/rawdata/fetcher:service_gopb",
        "//powerspikegg/rawdata/public:leagueoflegends_gopb",
        "@org_golang_google_grpc//:go_default_library",
        "@org_golang_google_grpc//reflection:go_default_library",
        "@org_golang_x_net//context:go_default_library",
    ],
)
