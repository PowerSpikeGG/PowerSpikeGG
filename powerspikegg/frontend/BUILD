load("@bazel_tools//tools/build_defs/docker:docker.bzl", "docker_build")

filegroup(
    name = "required_protos",
    srcs = [
        "//powerspikegg/rawdata/fetcher:service_protos",
        "//powerspikegg/rawdata/public:leagueoflegends_protos",
        "//powerspikegg/serving:match_computation_protos",
    ],
)

genrule(
    name = "install",
    srcs = [
        "scripts/install.sh",
        "package.json",
    ],
    outs = ["installed.txt"],
    cmd = "bash $(location scripts/install.sh) $(@D) $(GENDIR)",
    local = 1,
)

genrule(
    name = "protogen",
    srcs = [
        "scripts/protogen.sh",
        ":required_protos",
    ],
    outs = ["protogen.txt"],
    cmd = " ".join([
        "bash",
        "$(location scripts/protogen.sh)",
        "$(@D)",
        "powerspikegg/frontend/src/app/models/protos",
        "$(locations :required_protos)",
    ]),
    local = 1,
    tools = ["install"],
)

genrule(
    name = "frontend",
    srcs = ["scripts/build.sh"],
    outs = ["dist.tar"],
    cmd = "bash $(location scripts/build.sh) $(@D) $(GENDIR)",
    local = 1,
    tools = ["protogen"],
)

docker_build(
    name = "docker",
    base = "@docker_nginx//:image",
    directory = "/var/www",
    ports = ["80"],
    tars = [":frontend"],
    visibility = ["//visibility:public"],
)
