py_binary(
    name = "generate_graph",
    srcs = ["generate_graph.py"],
    deps = [
        ":graph",
        "@org_tensorflow//tensorflow:tensorflow_py",
        "@pydep_gflags//:library",
    ],
)

py_binary(
    name = "train_graph",
    srcs = ["train_graph.py"],
    deps = [
        ":train",
        "//powerspikegg/computation_models/fetcher",
        "@pydep_gflags//:library",
    ],
)

py_binary(
    name = "freeze",
    srcs = ["freeze.py"],
    deps = [
        "@org_tensorflow//tensorflow:tensorflow_py",
        "@pydep_gflags//:library",
    ],
)

py_library(
    name = "graph",
    srcs = ["graph.py"],
)

py_library(
    name = "train",
    srcs = ["train.py"],
    visibility = ["//visibility:public"],
    deps = [
        "@org_tensorflow//tensorflow:tensorflow_py",
    ],
)
