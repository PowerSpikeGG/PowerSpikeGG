py_binary(
    name = "generate_graph",
    srcs = ["generate_graph.py"],
    deps = [
        ":graph",
        "//third_party/python/tensorflow",
        "@pydep_gflags//:library",
    ],
)

py_binary(
    name = "train_graph",
    srcs = ["train_graph.py"],
    deps = [
        ":train",
        "//powerspikegg/computation_models/fetcher",
        "//third_party/python/tensorflow",
        "@pydep_gflags//:library",
    ],
)

py_binary(
    name = "freeze",
    srcs = ["freeze.py"],
    deps = [
        "//third_party/python/tensorflow",
        "@pydep_gflags//:library",
    ],
)

py_library(
    name = "graph",
    srcs = ["graph.py"],
    deps = [
        "//third_party/python/tensorflow",
    ],
)

py_library(
    name = "train",
    srcs = ["train.py"],
    visibility = ["//visibility:public"],
    deps = [
        "//third_party/python/tensorflow",
    ],
)
