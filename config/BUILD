# Configuration rules used in the Bazel infrastructure to create rules that
# act depending of the system (e.g. downloading the right binary).

#
# Operating System detection
#
config_setting(
    name = "darwin",
    values = {"cpu": "darwin"},
    visibility = ["//visibility:public"],
)

config_setting(
    name = "darwin_x86_64",
    values = {"cpu": "darwin_x86_64"},
    visibility = ["//visibility:public"],
)

config_setting(
    name = "tensorflow_global",
    values = {"define": "use_global_tensorflow=yes"},
    visibility = ["//visibility:public"],
)

config_setting(
    name = "tensorflow_python_gpu",
    values = {
        "define": "use_tensorflow_python=yes",
        "define": "use_tensorflow_with_gpu=yes",
    },
    visibility = ["//visibility:public"],
)

config_setting(
    name = "tensorflow_python",
    values = {"define": "use_tensorflow_python=yes"},
    visibility = ["//visibility:public"],
)
