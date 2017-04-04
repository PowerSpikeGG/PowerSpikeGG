py_library(
    name = "fetcher",
    srcs = [
        "fetcher.py",
        "//powerspikegg/rawdata/fetcher:service_py",
        "//powerspikegg/rawdata/public:leagueoflegends_py",
    ],
    deps = [
        "@org_tensorflow//third_party/py/numpy",
        "@pydep_gflags//:library",
    ],
)

py_test(
    name = "fetcher_test",
    srcs = [
        "fetcher_test.py",
        "//powerspikegg/rawdata/fetcher:service_py",
        "//powerspikegg/rawdata/public:leagueoflegends_py",
    ],
    deps = [
        ":fetcher",
        "@pydep_mock//:library",
    ],
)
