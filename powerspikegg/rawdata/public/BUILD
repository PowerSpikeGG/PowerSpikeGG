package(default_visibility=["//visibility:public"])

load("//powerspikegg:powerspikegg.bzl", "psgg_proto_library")

filegroup(
    name = "protos",
    srcs = glob(["*.proto"]),
)

psgg_proto_library(
    name = "leagueoflegends",
    srcs = [":protos"],
)
