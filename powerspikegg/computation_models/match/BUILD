py_binary(
    name = "generate_graph",
    srcs = ["generate_graph.py"],
    deps = [
        ":graph",
        "@pydep_gflags//:library",
    ],
)

py_binary(
    name = "train_graph",
    srcs = ["train_graph.py"],
    deps = [
        ":train",
        "@pydep_gflags//:library",
    ],
)

py_binary(
    name = "freeze",
    srcs = ["freeze.py"],
    deps = [
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
    deps = [
        "@org_tensorflow//tensorflow:tensorflow_py",
    ],
)
