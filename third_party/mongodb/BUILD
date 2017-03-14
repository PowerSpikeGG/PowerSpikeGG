# Rules used to manage a Mongo DB instance.
licenses(["notice"])  # GNU AGPL v3.0

load("@bazel_tools//tools/build_defs/docker:docker.bzl", "docker_build")

# Since genrules does not support select in srcs, create an alias that
# depends of the operating system that will be then used in the genrule.
alias(
    name = "server_files",
    actual = select({
        "//config:darwin": "@com_mongodb_darwin_x86_64//:server_files",
        "//config:darwin_x86_64": "@com_mongodb_darwin_x86_64//:server_files",
        "//conditions:default": "@com_mongodb_linux_x86_64//:server_files",
    }),
    visibility = ["//third_party/mongodb:__pkg__"],
)

alias(
    name = "client_files",
    actual = select({
        "//config:darwin": "@com_mongodb_darwin_x86_64//:client_files",
        "//config:darwin_x86_64": "@com_mongodb_darwin_x86_64//:client_files",
        "//conditions:default": "@com_mongodb_linux_x86_64//:client_files",
    }),
    visibility = ["//third_party/mongodb:__pkg__"],
)

docker_build(
    name = "docker",
    base = "@docker_debian//:image",
    directory = "/bin",
    entrypoint = ["/bin/mongod"],
    files = [":server_files"],
)

genrule(
    name = "server",
    srcs = [":server_files"],
    outs = ["mongod"],
    cmd = "cp $< $@",
    executable = 1,
    visibility = ["//visibility:public"],
)

genrule(
    name = "client",
    srcs = [":client_files"],
    outs = ["mongo"],
    cmd = "cp $< $@",
    executable = 1,
    visibility = ["//visibility:public"],
)
