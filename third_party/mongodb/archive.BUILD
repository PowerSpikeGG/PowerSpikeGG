# Rules managing the downloaded mongodb archive.
#
# Please do not use those rules for actual coding. See the targets defined in
# third_party/mongodb/BUILD.
#
# TODO(funkysayu): see if we can reduce this visibility so user don't use those
#                  rules.
package(default_visibility = ["//visibility:public"])

licenses(["notice"])

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
