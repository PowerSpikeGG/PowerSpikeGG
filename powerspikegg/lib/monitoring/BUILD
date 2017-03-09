py_library(
    name = "server",
    srcs = [
        "server.py",
    ],
    deps = [
        "@pydep_gflags//:library",
        "@pydep_prometheus_client//:library",
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
)

py_test(
    name = "watcher_test",
    srcs = [
        "watcher_test.py",
    ],
    deps = [
        ":watcher",
        "@pydep_mock//:library",
    ],
)
