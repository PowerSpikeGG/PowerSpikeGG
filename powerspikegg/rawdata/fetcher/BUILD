# Raw data fetcher

load("@org_pubref_rules_protobuf//python:rules.bzl", "py_proto_compile")

py_binary(
    name="server",
    srcs=[
        "server.py",
        ":service_py",
        "//powerspikegg/rawdata/public:leagueoflegends_py",
    ],
    deps=[
        ":converter",
        ":handler",
        ":cache",
    ],
)

py_test(
    name="server_test",
    srcs=[
        "server_test.py",
    ],
    deps=[
        ":server",
    ],
    data=[
        "//powerspikegg/rawdata/fetcher/samples",
    ],
)

py_library(
    name="cache",
    srcs=[
        "cache.py",
        ":service_py",
        "//powerspikegg/rawdata/public:leagueoflegends_py",
    ],
)

py_test(
    name="cache_test",
    srcs=[
        "cache_test.py",
    ],
    deps=[
        ":cache",
    ],
)

py_library(
    name="handler",
    srcs=[
        "handler.py",
    ],
)

py_test(
    name="handler_test",
    srcs=[
        "handler_test.py",
    ],
    deps=[
        ":handler",
    ],
)

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
