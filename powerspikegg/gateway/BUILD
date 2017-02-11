load("@io_bazel_rules_scala//scala:scala.bzl", "scala_library", "scala_binary", "scala_test")

filegroup(
    name = "src",
    srcs = glob([
        "src/*"
    ])
)

scala_binary(
    name = "server",
    srcs = ["src"],
    main_class = "Main",
    deps = ["akka-http_2.11"]
)

java_library(
  name="akka-http_2.11",
  visibility = ["//visibility:public"],
  exports = [
    "@com_typesafe_akka_akka_actor_2_11_2_4_16//jar",
    "@com_typesafe_akka_akka_http_2_11_10_0_3//jar",
    "@com_typesafe_akka_akka_http_core_2_11_10_0_3//jar",
    "@com_typesafe_akka_akka_parsing_2_11_10_0_3//jar",
    "@com_typesafe_akka_akka_stream_2_11_2_4_16//jar",
    "@com_typesafe_config_1_3_0//jar",
    "@com_typesafe_ssl_config_core_2_11_0_2_1//jar",
    "@org_reactivestreams_reactive_streams_1_0_0//jar",
    "@org_scala_lang_modules_scala_java8_compat_2_11_0_7_0//jar",
    "@org_scala_lang_modules_scala_parser_combinators_2_11_1_0_4//jar",
    "@org_scala_lang_scala_library_2_11_8//jar",
  ],
)
