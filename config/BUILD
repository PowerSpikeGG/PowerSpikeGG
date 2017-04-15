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
    name = "tensorflow_gpu",
    values = {"define": "gpu=yes"},
    visibility = ["//visibility:public"],
)
