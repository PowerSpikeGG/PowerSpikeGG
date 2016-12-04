# Raw data fetcher

py_library(
    name="converter",
    srcs=[
        "converter.py",
        "//powerspikegg/rawdata/public:leagueoflegends_py",
    ],
    deps=[
        "//powerspikegg/rawdata/lib/python:static",
    ]
)

py_test(
    name="converter_test",
    srcs=[
        "converter_test.py",
        "//powerspikegg/rawdata/public:leagueoflegends_py",
    ],
    deps=[
        ":converter",
        "//powerspikegg/rawdata/lib/python:static",
    ],
    data=[
        "//powerspikegg/rawdata/fetcher/samples",
    ]
)
