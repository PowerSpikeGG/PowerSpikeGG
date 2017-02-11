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

load("@io_bazel_rules_go//proto:go_proto_library.bzl", "go_proto_repositories")

go_proto_repositories()

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

#
# Development dependencies
#

# MongoDB dependency, used for test purpose (not used in production)
new_http_archive(
    name = "com_mongodb_binary",
    build_file = "third_party/mongodb.BUILD",
    sha256 = "7d8aa843c83ed1cbcd05b5ad8b9c9d6d46de12506c77d3c29c303fba7f19eebc",
    strip_prefix = "mongodb-linux-x86_64-3.4.1",
    url = "https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.4.1.tgz",
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

py_proto_repositories()  # Also bootstrap the cpp repository

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
    name="pydep_requests",
    build_file="third_party/python/requests.BUILD",
    remote="https://github.com/kennethreitz/requests.git",
    tag="v2.13.0",
)


#
# Go dependencies
#

load("@io_bazel_rules_go//go:def.bzl", "new_go_repository")

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
    commit = "f7011571680d9e541df1e0221b8d865bf34f4248",
    importpath = "google.golang.org/grpc",
)

new_go_repository(
    name = "org_golang_google_grpc",
    commit = "f7011571680d9e541df1e0221b8d865bf34f4248",
    importpath = "google.golang.org/grpc",
)

new_go_repository(
    name = "org_golang_x_net",
    commit = "236b8f043b920452504e263bc21d354427127473",
    importpath = "golang.org/x/net",
)

#
# Java dependencies
# Generated with https://github.com/pgr0ss/bazel-deps
# 

# Akka Http 
maven_jar(name = "com_typesafe_akka_akka_actor_2_11_2_4_16", artifact = "com.typesafe.akka:akka-actor_2.11:jar:2.4.16")
maven_jar(name = "com_typesafe_akka_akka_http_core_2_11_10_0_3", artifact = "com.typesafe.akka:akka-http-core_2.11:jar:10.0.3")
maven_jar(name = "com_typesafe_akka_akka_http_2_11_10_0_3", artifact = "com.typesafe.akka:akka-http_2.11:jar:10.0.3")
maven_jar(name = "com_typesafe_akka_akka_parsing_2_11_10_0_3", artifact = "com.typesafe.akka:akka-parsing_2.11:jar:10.0.3")
maven_jar(name = "com_typesafe_akka_akka_stream_2_11_2_4_16", artifact = "com.typesafe.akka:akka-stream_2.11:jar:2.4.16")
maven_jar(name = "com_typesafe_config_1_3_0", artifact = "com.typesafe:config:jar:1.3.0")
maven_jar(name = "org_reactivestreams_reactive_streams_1_0_0", artifact = "org.reactivestreams:reactive-streams:jar:1.0.0")
maven_jar(name = "org_scala_lang_modules_scala_java8_compat_2_11_0_7_0", artifact = "org.scala-lang.modules:scala-java8-compat_2.11:jar:0.7.0")
maven_jar(name = "org_scala_lang_scala_library_2_11_8", artifact = "org.scala-lang:scala-library:jar:2.11.8")
maven_jar(name = "org_scala_lang_modules_scala_parser_combinators_2_11_1_0_4", artifact = "org.scala-lang.modules:scala-parser-combinators_2.11:jar:1.0.4")
maven_jar(name = "com_typesafe_ssl_config_core_2_11_0_2_1", artifact = "com.typesafe:ssl-config-core_2.11:jar:0.2.1")

#
# Scala rules
#

git_repository(
    name = "io_bazel_rules_scala",
    remote = "https://github.com/bazelbuild/rules_scala.git",
    commit = "73743b830ae98d13a946b25ad60cad5fee58e6d3", # update this as needed
)

load("@io_bazel_rules_scala//scala:scala.bzl", "scala_repositories")
scala_repositories()