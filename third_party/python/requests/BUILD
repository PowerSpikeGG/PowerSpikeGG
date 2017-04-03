licenses(["notice"])

#
# Library containing certificates loader used by requests module in order to
# find the cacert.pem file. This target is required by any rule that compiles
# python rules into a tar file, and often forget to embed the data files used
# by the python scripts in those tars (e.g. the certificates).
#
py_library(
    name = "docker_certificates",
    srcs = ["certifi.py"],
    imports = ["."],
    visibility = ["//visibility:public"],
)
