cc_binary(
    name = "simple_model",
    srcs = ["src/main.cc"],
    deps = [
        ":simple_model_graph",
        "//powerspikegg/computation-models/utils:utils"
    ],
)

cc_library(
    name = "simple_model_graph",
    srcs = [
        "src/graph.cc",
    ],
    hdrs = ["src/graph.h"],
    deps = [
        "@org_tensorflow//tensorflow/cc:cc_ops",
        "@org_tensorflow//tensorflow/cc:client_session",
        "@org_tensorflow//tensorflow/core:tensorflow",
    ],
)
