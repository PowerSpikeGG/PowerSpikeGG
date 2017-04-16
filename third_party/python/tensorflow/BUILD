licenses(["notice"])  # GNU AGPL v3.0

alias(
    name = "tensorflow_python",
    actual = select({
        "//config:tensorflow_gpu": "@pydep_tensorflow_gpu//:library",
        "//conditions:default": "@pydep_tensorflow//:library",
    }),
    visibility = ["//visibility:public"],
)
