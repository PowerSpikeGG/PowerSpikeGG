licenses(["notice"])  # GNU AGPL v3.0

alias(
    name = "tensorflow",
    actual = select({
        "//config:tensorflow_global": "@pydep_tensorflow//:library",
        "//config:tensorflow_python_gpu": "@pydep_tensorflow_gpu//:library",
        "//config:tensorflow_python": "@pydep_tensorflow//:library",
        "//conditions:default": "@org_tensorflow//tensorflow:tensorflow_py",
    }),
    visibility = ["//visibility:public"],
)
