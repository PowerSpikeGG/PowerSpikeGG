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

py_library(
    name = "rwmock",
    testonly = 1,
    srcs = ["rwmock.py"],
    data = glob(["samples/*.json"]),
    deps = ["@pydep_mock//:library"],
)
