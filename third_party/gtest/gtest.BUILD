cc_library(
    name = "lib",
    srcs = glob(
    ["googletest/src/*"],
        exclude = ["googletest/src/gtest-all.cc"]
    ),
    hdrs = glob([
        "googletest/include/**/*.h",
    ]),
    strip_include_prefix = "googletest/include",
    copts = ["-Iexternal/gtest/googletest"],
    linkopts = ["-pthread"],
    visibility = ["//visibility:public"],
)
