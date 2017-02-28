py_library(
    name = "wrapper",
    testonly = 1,
    srcs = [
        "wrapper.py",
    ],
    data = [
        "//third_party/mongodb:server",
    ],
    visibility = [
        "//visibility:public",
    ],
)

py_test(
    name = "wrapper_test",
    srcs = [
        "wrapper_test.py",
    ],
    deps = [
        ":wrapper",
        "@pydep_pymongo//:library",
    ],
)
