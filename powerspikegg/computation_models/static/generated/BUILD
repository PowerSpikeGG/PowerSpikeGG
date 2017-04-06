load("@bazel_tools//tools/build_defs/docker:docker.bzl", "docker_build")

filegroup(
    name = "frozen_models",
    srcs = glob(["**/*"]),
)

docker_build(
    name = "docker",
    base = "@docker_debian_pkg//:image",
    directory = "/data/models",
    files = [":frozen_models"],
    ports = ["80"],
    visibility = ["//visibility:public"],
)
