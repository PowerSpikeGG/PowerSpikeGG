# Bazel workspace definition.
# ###########################
#
# Installs external dependencies and bootstrap the compilation tools before
# running any build rules.

workspace(name = "org_powerspikegg")

#
# Github dependencies
#

# Golang Bazel rules
git_repository(
    name = "io_bazel_rules_go",
    remote = "https://github.com/bazelbuild/rules_go",
    tag = "0.4.0",
)

# Protobuf compilation rules
# TODO(funkysayu) Rewrite those rules to be more generic while generating
#                 protobufs APIs.
git_repository(
    name = "org_pubref_rules_protobuf",
    remote = "https://github.com/pubref/rules_protobuf",
    tag = "v0.7.1",
)

# Python dependencies management
git_repository(
    name = "com_github_gengo_rules_pypi",
    commit = "c5eb70d7c31adf18bdca1813f69cde51f17c8c62",
    remote = "https://github.com/gengo/rules_pypi",
)

# Python packaging management
# For packaging python
git_repository(
    name = "subpar",
    commit = "74529f1df2178f07d34c72b3d270355dab2a10fc",
    remote = "https://github.com/google/subpar",
)

# Bazel countineous integration
git_repository(
    name = "io_bazel_ci",
    commit = "44f34b35cc23bbc403a4fcf255514d86a3bdf0ad",
    remote = "https://github.com/bazelbuild/continuous-integration",
)

# Tensorflow and tensorflow serving
local_repository(
    name = "org_tensorflow",
    path = "third_party/tensorflow",
)

git_repository(
    name = "tf_serving",
    commit = "4d0a571ff9c15b937f58d3d5e97a5310b5decf2b",
    remote = "https://github.com/tensorflow/serving.git",
)

#
# Development dependencies
#

# C++ dependencies
new_git_repository(
    name = "gtest",
    build_file = "third_party/gtest/gtest.BUILD",
    remote = "https://github.com/google/googletest.git",
    tag = "release-1.8.0",
)

bind(
    name = "gflags",
    actual = "@com_github_gflags_gflags//:gflags",
)

#
# Rules closure is a dependency of tensorflow, therefore this rule must be present and loaded,
# however do not execute it in the current WORKSPACE as it is not compatible with scala and java rules
#

http_archive(
    name = "io_bazel_rules_closure",
    sha256 = "60fc6977908f999b23ca65698c2bb70213403824a84f7904310b6000d78be9ce",
    strip_prefix = "rules_closure-5ca1dab6df9ad02050f7ba4e816407f88690cf7d",
    urls = [
        "http://bazel-mirror.storage.googleapis.com/github.com/bazelbuild/rules_closure/archive/5ca1dab6df9ad02050f7ba4e816407f88690cf7d.tar.gz",  # 2017-02-03
        "https://github.com/bazelbuild/rules_closure/archive/5ca1dab6df9ad02050f7ba4e816407f88690cf7d.tar.gz",
    ],
)

load("@io_bazel_rules_closure//closure:defs.bzl", "closure_repositories")
load("@tf_serving//tensorflow_serving:workspace.bzl", "tf_serving_workspace")

tf_serving_workspace()

# MongoDB dependency, used for test purpose.
# TODO(funkysayu): Migrate this to docker if possible
new_http_archive(
    name = "com_mongodb_linux_x86_64",
    build_file = "third_party/mongodb/archive.BUILD",
    sha256 = "7d8aa843c83ed1cbcd05b5ad8b9c9d6d46de12506c77d3c29c303fba7f19eebc",
    strip_prefix = "mongodb-linux-x86_64-3.4.1",
    url = "https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.4.1.tgz",
)

new_http_archive(
    name = "com_mongodb_darwin_x86_64",
    build_file = "third_party/mongodb/archive.BUILD",
    sha256 = "b7910cd4c840b58b249c1c3d5320d64ff3b708ae49c4526ddf7abaa549449e7f",
    strip_prefix = "mongodb-osx-x86_64-3.4.1",
    url = "https://fastdl.mongodb.org/osx/mongodb-osx-x86_64-3.4.1.tgz",
)

#
# Docker dependencies
#

load("@io_bazel_ci//base:docker_pull.bzl", "docker_pull")

docker_pull(
    name = "docker_debian",
    tag = "debian",
)

docker_pull(
    name = "docker_debian_pkg",
    tag = "olbat/debian-pkg",
)

docker_pull(
    name = "docker_python3",
    tag = "funkysayu/py3grpcio:1.1.3",
)

docker_pull(
    name = "docker_nginx",
    tag = "kyma/docker-nginx",
)

docker_pull(
    name = "docker_openjdk",
    tag = "openjdk:8",
)

docker_pull(
    name = "docker_prometheus",
    tag = "prom/prometheus",
)

#
# Repository / library bootstraping
#

# Bootstrap the Golang rules
load("@io_bazel_rules_go//go:def.bzl", "go_repositories")

go_repositories()

# Load proto compiler per languages
load("@org_pubref_rules_protobuf//python:rules.bzl", "py_proto_repositories")
load("@org_pubref_rules_protobuf//java:rules.bzl", "java_proto_repositories")
load("@org_pubref_rules_protobuf//go:rules.bzl", "go_proto_repositories")

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
    name = "pydep_gflags",
    pkg = "python-gflags",
    pure = 1,
    srcs_version = "PY2AND3",
    version = "3.1.0",
)

pypi_repository(
    name = "pydep_appdirs",
    pkg = "appdirs",
    pure = 1,
    srcs_version = "PY2AND3",
    version = "1.4.0",
)

pypi_repository(
    name = "pydep_mock",
    pkg = "mock",
    pure = 1,
    srcs_version = "PY2AND3",
    version = "1.0.1",
)

pypi_repository(
    name = "pydep_prometheus_client",
    pkg = "prometheus_client",
    pure = 1,
    srcs_version = "PY2AND3",
    version = "0.0.19",
)

pypi_repository(
    name = "pydep_pymongo",
    pkg = "pymongo",
    pure = 1,
    srcs_version = "PY2AND3",
    version = "3.4.0",
)

# Since requests uses some specific files into its repository but is a pure
# Python package, we manage its dependency through github instead of Pypi
# with a custom BUILD file.
new_git_repository(
    name = "pydep_requests",
    build_file = "third_party/python/requests/archive.BUILD",
    remote = "https://github.com/kennethreitz/requests.git",
    tag = "v2.13.0",
)

#
# Go dependencies
#

load("@io_bazel_rules_go//go:def.bzl", "new_go_repository")

new_go_repository(
    name = "com_github_oleiade_lane",
    commit = "3053869314bb02cb983dc2205da8ea2abe46fa96",
    importpath = "github.com/oleiade/lane",
)

new_go_repository(
    name = "com_github_google_subcommands",
    commit = "43f65adde14103c0e32a37df5a4abfe7b19c7251",
    importpath = "github.com/google/subcommands",
)

new_go_repository(
    name = "com_github_golang_protobuf",
    commit = "8ee79997227bf9b34611aee7946ae64735e6fd93",
    importpath = "github.com/golang/protobuf",
)

new_go_repository(
    name = "org_golang_google_grpc",
    importpath = "google.golang.org/grpc",
    tag = "v1.0.5",
)

new_go_repository(
    name = "org_golang_x_net",
    commit = "236b8f043b920452504e263bc21d354427127473",
    importpath = "golang.org/x/net",
)

new_go_repository(
    name = "com_github_op_go_logging",
    commit = "970db520ece77730c7e4724c61121037378659d9",
    importpath = "github.com/op/go-logging",
)

#
# Scala rules
#

git_repository(
    name = "io_bazel_rules_scala",
    commit = "73743b830ae98d13a946b25ad60cad5fee58e6d3",  # update this as needed
    remote = "https://github.com/bazelbuild/rules_scala.git",
)

load("@io_bazel_rules_scala//scala:scala.bzl", "scala_repositories")

scala_repositories()

#
# Java dependencies
# TODO(cassand): move the dependencies into the gateway module
# Generated with https://github.com/pgr0ss/bazel-deps
#

git_repository(
    name = "bazel_deps",
    commit = "064fe42a018759fefcbda9211c9ef80120d03043",
    init_submodules = 1,
    remote = "https://github.com/pgr0ss/bazel-deps.git",
)

# Akka Http
maven_jar(
    name = "com_typesafe_akka_akka_actor_2_11_2_4_16",
    artifact = "com.typesafe.akka:akka-actor_2.11:jar:2.4.16",
)

maven_jar(
    name = "com_typesafe_akka_akka_http_core_2_11_10_0_3",
    artifact = "com.typesafe.akka:akka-http-core_2.11:jar:10.0.3",
)

maven_jar(
    name = "com_typesafe_akka_akka_http_2_11_10_0_3",
    artifact = "com.typesafe.akka:akka-http_2.11:jar:10.0.3",
)

maven_jar(
    name = "com_typesafe_akka_akka_parsing_2_11_10_0_3",
    artifact = "com.typesafe.akka:akka-parsing_2.11:jar:10.0.3",
)

maven_jar(
    name = "com_typesafe_akka_akka_stream_2_11_2_4_16",
    artifact = "com.typesafe.akka:akka-stream_2.11:jar:2.4.16",
)

maven_jar(
    name = "com_typesafe_config_1_3_0",
    artifact = "com.typesafe:config:jar:1.3.0",
)

maven_jar(
    name = "org_reactivestreams_reactive_streams_1_0_0",
    artifact = "org.reactivestreams:reactive-streams:jar:1.0.0",
)

maven_jar(
    name = "org_scala_lang_modules_scala_java8_compat_2_11_0_7_0",
    artifact = "org.scala-lang.modules:scala-java8-compat_2.11:jar:0.7.0",
)

maven_jar(
    name = "org_scala_lang_scala_library_2_11_8",
    artifact = "org.scala-lang:scala-library:jar:2.11.8",
)

maven_jar(
    name = "org_scala_lang_modules_scala_parser_combinators_2_11_1_0_4",
    artifact = "org.scala-lang.modules:scala-parser-combinators_2.11:jar:1.0.4",
)

maven_jar(
    name = "com_typesafe_ssl_config_core_2_11_0_2_1",
    artifact = "com.typesafe:ssl-config-core_2.11:jar:0.2.1",
)

# GRPC
maven_jar(
    name = "com_google_auth_google_auth_library_credentials_0_4_0",
    artifact = "com.google.auth:google-auth-library-credentials:jar:0.4.0",
)

maven_jar(
    name = "io_grpc_grpc_all_1_0_3",
    artifact = "io.grpc:grpc-all:jar:1.0.3",
)

maven_jar(
    name = "io_grpc_grpc_auth_1_0_3",
    artifact = "io.grpc:grpc-auth:jar:1.0.3",
)

maven_jar(
    name = "io_grpc_grpc_context_1_0_3",
    artifact = "io.grpc:grpc-context:jar:1.0.3",
)

maven_jar(
    name = "io_grpc_grpc_core_1_0_3",
    artifact = "io.grpc:grpc-core:jar:1.0.3",
)

maven_jar(
    name = "io_grpc_grpc_netty_1_0_3",
    artifact = "io.grpc:grpc-netty:jar:1.0.3",
)

maven_jar(
    name = "io_grpc_grpc_okhttp_1_0_3",
    artifact = "io.grpc:grpc-okhttp:jar:1.0.3",
)

maven_jar(
    name = "io_grpc_grpc_protobuf_1_0_3",
    artifact = "io.grpc:grpc-protobuf:jar:1.0.3",
)

maven_jar(
    name = "io_grpc_grpc_protobuf_lite_1_0_3",
    artifact = "io.grpc:grpc-protobuf-lite:jar:1.0.3",
)

maven_jar(
    name = "io_grpc_grpc_protobuf_nano_1_0_3",
    artifact = "io.grpc:grpc-protobuf-nano:jar:1.0.3",
)

maven_jar(
    name = "io_grpc_grpc_stub_1_0_3",
    artifact = "io.grpc:grpc-stub:jar:1.0.3",
)

maven_jar(
    name = "com_google_code_gson_gson_2_3",
    artifact = "com.google.code.gson:gson:jar:2.3",
)

maven_jar(
    name = "com_google_guava_guava_19_0",
    artifact = "com.google.guava:guava:jar:19.0",
)

maven_jar(
    name = "com_google_code_findbugs_jsr305_3_0_0",
    artifact = "com.google.code.findbugs:jsr305:jar:3.0.0",
)

maven_jar(
    name = "io_netty_netty_buffer_4_1_6_Final",
    artifact = "io.netty:netty-buffer:jar:4.1.6.Final",
)

maven_jar(
    name = "io_netty_netty_codec_4_1_6_Final",
    artifact = "io.netty:netty-codec:jar:4.1.6.Final",
)

maven_jar(
    name = "io_netty_netty_codec_http_4_1_6_Final",
    artifact = "io.netty:netty-codec-http:jar:4.1.6.Final",
)

maven_jar(
    name = "io_netty_netty_codec_http2_4_1_6_Final",
    artifact = "io.netty:netty-codec-http2:jar:4.1.6.Final",
)

maven_jar(
    name = "io_netty_netty_codec_socks_4_1_6_Final",
    artifact = "io.netty:netty-codec-socks:jar:4.1.6.Final",
)

maven_jar(
    name = "io_netty_netty_common_4_1_6_Final",
    artifact = "io.netty:netty-common:jar:4.1.6.Final",
)

maven_jar(
    name = "io_netty_netty_handler_4_1_6_Final",
    artifact = "io.netty:netty-handler:jar:4.1.6.Final",
)

maven_jar(
    name = "io_netty_netty_handler_proxy_4_1_6_Final",
    artifact = "io.netty:netty-handler-proxy:jar:4.1.6.Final",
)

maven_jar(
    name = "io_netty_netty_resolver_4_1_6_Final",
    artifact = "io.netty:netty-resolver:jar:4.1.6.Final",
)

maven_jar(
    name = "io_netty_netty_transport_4_1_6_Final",
    artifact = "io.netty:netty-transport:jar:4.1.6.Final",
)

maven_jar(
    name = "com_squareup_okhttp_okhttp_2_5_0",
    artifact = "com.squareup.okhttp:okhttp:jar:2.5.0",
)

maven_jar(
    name = "com_squareup_okio_okio_1_6_0",
    artifact = "com.squareup.okio:okio:jar:1.6.0",
)

maven_jar(
    name = "com_google_protobuf_protobuf_java_3_0_2",
    artifact = "com.google.protobuf:protobuf-java:jar:3.0.2",
)

maven_jar(
    name = "com_google_protobuf_protobuf_java_util_3_0_2",
    artifact = "com.google.protobuf:protobuf-java-util:jar:3.0.2",
)

maven_jar(
    name = "com_google_protobuf_nano_protobuf_javanano_3_0_0_alpha_5",
    artifact = "com.google.protobuf.nano:protobuf-javanano:jar:3.0.0-alpha-5",
)

maven_jar(
    name = "com_google_protobuf_protobuf_lite_3_0_1",
    artifact = "com.google.protobuf:protobuf-lite:jar:3.0.1",
)

# Akka testkut
maven_jar(
    name = "com_typesafe_akka_akka_http_testkit_2_11_10_0_3",
    artifact = "com.typesafe.akka:akka-http-testkit_2.11:jar:10.0.3",
)

maven_jar(
    name = "com_typesafe_akka_akka_stream_testkit_2_11_2_4_16",
    artifact = "com.typesafe.akka:akka-stream-testkit_2.11:jar:2.4.16",
)

maven_jar(
    name = "com_typesafe_akka_akka_testkit_2_11_2_4_16",
    artifact = "com.typesafe.akka:akka-testkit_2.11:jar:2.4.16",
)

maven_jar(
    name = "org_scala_lang_scala_reflect_2_11_8",
    artifact = "org.scala-lang:scala-reflect:jar:2.11.8",
)

maven_jar(
    name = "org_scala_lang_modules_scala_xml_2_11_1_0_5",
    artifact = "org.scala-lang.modules:scala-xml_2.11:jar:1.0.5",
)

maven_jar(
    name = "org_scalactic_scalactic_2_11_3_0_1",
    artifact = "org.scalactic:scalactic_2.11:jar:3.0.1",
)

maven_jar(
    name = "org_scalatest_scalatest_2_11_3_0_1",
    artifact = "org.scalatest:scalatest_2.11:jar:3.0.1",
)

new_go_repository(
    name = "com_github_oleiade_lane",
    commit = "3053869314bb02cb983dc2205da8ea2abe46fa96",
    importpath = "github.com/oleiade/lane",
)
