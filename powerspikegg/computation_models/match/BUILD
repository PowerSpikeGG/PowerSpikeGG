py_binary(
    name = "generate_graph",
    srcs = ["generate_graph.py"],
    deps = [
        ":graph",
        "@pydef_tensorflow//:library",
        "@pydep_gflags//:library",
    ],
)

py_binary(
    name = "train_graph",
    srcs = ["train_graph.py"],
    deps = [
        ":train",
        "//powerspikegg/computation_models/fetcher",
        "@pydef_tensorflow//:library",
        "@pydep_gflags//:library",
    ],
)

py_binary(
    name = "freeze",
    srcs = ["freeze.py"],
    deps = [
        "@pydef_tensorflow//:library",
        "@pydep_gflags//:library",
    ],
)

py_library(
    name = "graph",
    srcs = ["graph.py"],
    deps = [
        "@pydef_tensorflow//:library",
    ],
)

py_library(
    name = "train",
    srcs = ["train.py"],
    visibility = ["//visibility:public"],
    deps = [
        "@pydef_tensorflow//:library",
    ],
)
