licenses(["notice"])  # MIT

package(default_visibility = ["//visibility:public"])

py_library(
    name = "riotwatcher",
    srcs = ["riotwatcher.py"],
    deps = ["@pydep_requests//:library"],
)

py_test(
    name = "riotwatcher_test",
    srcs = ["riotwatcher_test.py"],
    deps = [":riotwatcher"],
)
