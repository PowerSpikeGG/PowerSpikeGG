py_binary(
    name = "generate_graph",
    srcs = ["generate_graph.py"],
    deps = [
        ":graph",
        "@pydep_gflags//:library",
        "@pydep_tensorflow//:library",
    ],
)

py_binary(
    name = "train_graph",
    srcs = ["train_graph.py"],
    deps = [
        ":train",
        "//powerspikegg/computation_models/fetcher",
        "@pydep_gflags//:library",
        "@pydep_tensorflow//:library",
    ],
)

py_binary(
    name = "freeze",
    srcs = ["freeze.py"],
    deps = [
        "@pydep_gflags//:library",
        "@pydep_tensorflow//:library",
    ],
)

py_library(
    name = "graph",
    srcs = ["graph.py"],
    deps = [
        "@pydep_tensorflow//:library",
    ],
)

py_library(
    name = "train",
    srcs = ["train.py"],
    visibility = ["//visibility:public"],
    deps = [
        "@pydep_tensorflow//:library",
    ],
)
