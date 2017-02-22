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
    name = "mock",
    srcs = ["mock.py"],
    deps = ["@pydep_mock//:library"],
    data = glob(["samples/*.json"]),
    testonly = 1,
)
