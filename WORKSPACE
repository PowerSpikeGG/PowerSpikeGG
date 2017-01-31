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

# Protobuf compilation rules
# TODO(funkysayu) Rewrite those rules to be more generic while generating
#                 protobufs APIs.
git_repository(
    name="org_pubref_rules_protobuf",
    remote="https://github.com/pubref/rules_protobuf",
    tag="v0.7.1",
)

# Python dependencies management
git_repository(
    name="com_github_gengo_rules_pypi",
    remote="https://github.com/gengo/rules_pypi",
    commit="c5eb70d7c31adf18bdca1813f69cde51f17c8c62",
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


#
# Python Dependencies
#

load("@com_github_gengo_rules_pypi//pypi:def.bzl", "pypi_repositories")
load("@com_github_gengo_rules_pypi//pypi:def.bzl", "pypi_repository")
pypi_repositories()

pypi_repository(
    name="pydep_gflags",
    pkg="python-gflags",
    pure=1,
    srcs_version="PY2AND3",
    version="3.1.0",
)

pypi_repository(
    name="pydep_appdirs",
    pkg="appdirs",
    pure=1,
    srcs_version="PY2AND3",
    version="1.4.0",
)

pypi_repository(
    name="pydep_mock",
    pkg="mock",
    pure=1,
    srcs_version="PY2AND3",
    version="1.0.1",
)

pypi_repository(
    name="pydep_mockupdb",
    pkg="mockupdb",
    pure=1,
    srcs_version="PY2AND3",
    version="1.1.1",
)

pypi_repository(
    name="pydep_requests",
    pkg="requests",
    pure=1,
    srcs_version="PY2AND3",
    version="2.13.0",
)

pypi_repository(
    name="pydep_pymongo",
    pkg="pymongo",
    pure=1,
    srcs_version="PY2AND3",
    version="3.4.0",
)
