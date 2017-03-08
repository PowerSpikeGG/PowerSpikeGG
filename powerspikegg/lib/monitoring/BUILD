py_library(
    name = "server",
    srcs = [
        "server.py",
    ],
    deps = [
        "@pydep_prometheus_client//:library",
        "@pydep_gflags//:library",
    ],
)

py_library(
    name = "rpc",
    srcs = [
        "rpc.py",
    ],
    deps = [
        ":server",
        "@pydep_prometheus_client//:library",
        "@pydep_gflags//:library",
    ],
    visibility = [
        "//visibility:public",
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
