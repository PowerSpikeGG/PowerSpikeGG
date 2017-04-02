load("@bazel_tools//tools/build_defs/docker:docker.bzl", "docker_build")

genrule(
    name = "install",
    srcs = [
        "scripts/install.sh",
        "package.json",
    ],
    outs = ["installed.txt"],
    cmd = "bash $(location scripts/install.sh) $(@D) $(GENDIR)",
    local = 1,
)

genrule(
    name = "frontend",
    srcs = ["scripts/build.sh"],
    outs = ["dist.tar"],
    cmd = "bash $(location scripts/build.sh) $(@D) $(GENDIR)",
    local = 1,
    tools = ["install"],
)

docker_build(
    name = "docker",
    base = "@docker_nginx//:image",
    directory = "/var/www",
    tars = [":frontend"],
    visibility = ["//visibility:public"],
)
