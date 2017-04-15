py_binary(
    name = "generate_graph",
    srcs = ["generate_graph.py"],
    deps = [
        ":graph",
        ":tensorflow",
        "@pydep_gflags//:library",
    ],
)

py_binary(
    name = "train_graph",
    srcs = ["train_graph.py"],
    deps = [
        ":tensorflow",
        ":train",
        "//powerspikegg/computation_models/fetcher",
        "@pydep_gflags//:library",
    ],
)

py_binary(
    name = "freeze",
    srcs = ["freeze.py"],
    deps = [
        ":tensorflow",
        "@pydep_gflags//:library",
    ],
)

py_library(
    name = "graph",
    srcs = ["graph.py"],
    deps = [
        ":tensorflow",
    ],
)

py_library(
    name = "train",
    srcs = ["train.py"],
    visibility = ["//visibility:public"],
    deps = [
        ":tensorflow",
    ],
)

alias(
    name = "tensorflow",
    actual = select({
        "//config:tensorflow_gpu": "@pydep_tensorflow_gpu//:library",
        "//conditions:default": "@pydep_tensorflow//:library",
    }),
)
