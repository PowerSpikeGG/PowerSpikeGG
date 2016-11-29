package(default_visibility=[
    "//visibility:public",
])

load("@org_pubref_rules_protobuf//python:rules.bzl", "py_proto_compile")

filegroup(
    name = "protos",
    srcs = glob(["*.proto"]),
)

py_proto_compile(
    name = "leagueoflegends_py",
    protos = [":protos"],
    with_grpc = True,
)
