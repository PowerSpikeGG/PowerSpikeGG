load("@bazel_tools//tools/build_defs/docker:docker.bzl", "docker_build")

docker_build(
    name = "wheezy",
    base = "@ubuntu-wily-amd64//:image",
    visibility = ["//visibility:public"],
)
