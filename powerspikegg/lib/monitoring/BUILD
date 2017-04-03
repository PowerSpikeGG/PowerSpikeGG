py_library(
    name = "server",
    srcs = [
        "server.py",
    ],
    deps = [
        ":flags",
        ":watcher",
        "@pydep_gflags//:library",
        "@pydep_prometheus_client//:library",
    ],
)

py_library(
    name = "flags",
    srcs = [
        "flags.py",
    ],
    deps = [
        "@pydep_gflags//:library",
    ],
)

py_library(
    name = "rpc",
    srcs = [
        "rpc.py",
    ],
    visibility = [
        "//visibility:public",
    ],
    deps = [
        ":server",
        "@pydep_gflags//:library",
        "@pydep_prometheus_client//:library",
    ],
)

py_test(
    name = "rpc_test",
    srcs = [
        "rpc_test.py",
    ],
    deps = [
        ":rpc",
        "@pydep_pymongo//:library",
    ],
)

py_library(
    name = "watcher",
    srcs = [
        "watcher.py",
    ],
    visibility = [
        "//visibility:public",
    ],
    deps = [
        ":flags",
        "@pydep_gflags//:library",
    ],
)

py_test(
    name = "watcher_test",
    srcs = [
        "watcher_test.py",
    ],
    deps = [
        ":flags",
        ":watcher",
        "@pydep_gflags//:library",
        "@pydep_mock//:library",
    ],
)
