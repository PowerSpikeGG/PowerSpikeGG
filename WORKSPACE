# Bazel workspace definition.
# ###########################
#
# Installs external dependencies and bootstrap the compilation tools before
# running any build rules.

workspace(name="org_powerspikegg")

#
# Github dependencies
#

# Golang Bazel rules
git_repository(
    name="io_bazel_rules_go",
    remote="https://github.com/bazelbuild/rules_go.git",
    tag="0.3.0",
)

# Protobuf compiler
git_repository(
    name="protobuf",
    remote="https://github.com/google/protobuf",
    tag="v3.1.0",
)

# Protobuf compilation rules
# TODO(funkysayu) Rewrite those rules to be more generic while generating
#                 protobufs APIs.
git_repository(
    name="org_pubref_rules_protobuf",
    remote="https://github.com/pubref/rules_protobuf",
    tag="v0.7.1",
)


#
# Repository / library bootstraping
#

# Bootstrap the Golang rules
load("@io_bazel_rules_go//go:def.bzl", "go_repositories")
go_repositories()

# Load proto compiler per languages
load("@org_pubref_rules_protobuf//python:rules.bzl", "py_proto_repositories")
load("@org_pubref_rules_protobuf//go:rules.bzl", "go_proto_repositories")
load("@org_pubref_rules_protobuf//java:rules.bzl", "java_proto_repositories")
py_proto_repositories()  # Also bootstrap the cpp repository
go_proto_repositories()
java_proto_repositories()

# Load docker image
load("//thirdparty/bazel-docker:docker-pull.bzl", "docker_pull")

docker_pull(
    name = "ubuntu-wily-amd64",
    dockerfile = "//thirdparty/bazel-docker:Dockerfile.node",
    tag = "local:ubuntu-wily-amd64",
)