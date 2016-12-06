# Raw data fetcher

load("@org_pubref_rules_protobuf//python:rules.bzl", "py_proto_compile")

filegroup(
    name="protos",
    srcs=glob(["*.proto"])
)

py_proto_compile(
    name="service_py",
    protos=[":protos"],
    deps=["//powerspikegg/rawdata/public:leagueoflegends_py"],
    with_grpc=True,
    visibility=["//visibility:public"],
)

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
