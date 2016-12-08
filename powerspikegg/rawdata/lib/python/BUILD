package(default_visibility=[
    "//visibility:public",
])

py_library(
    name="static",
    srcs=[
        "static.py",
        "//powerspikegg/rawdata/public:leagueoflegends_py",
    ],
)

py_test(
    name="static_test",
    srcs=[
        "static_test.py",
        "//powerspikegg/rawdata/public:leagueoflegends_py",
    ],
    deps=[
        ":static",
    ],
)
