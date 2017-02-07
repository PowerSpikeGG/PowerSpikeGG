licenses(["notice"])

package(default_visibility = ["//visibility:public"])

filegroup(
    name = "all_files",
    srcs = glob(["**/*"]),
)

filegroup(
    name = "client_files",
    srcs = [
        "bin/mongo",
    ],
)

filegroup(
    name = "server_files",
    srcs = [
        "bin/mongod",
    ],
)

genrule(
    name = "client",
    srcs = [
        ":client_files",
    ],
    outs = [
        "mongo",
    ],
    cmd = "cp $< $@",
    executable = 1,
)

genrule(
    name = "server",
    srcs = [
        ":server_files",
    ],
    outs = [
        "mongod",
    ],
    cmd = "cp $< $@",
    executable = 1,
)
