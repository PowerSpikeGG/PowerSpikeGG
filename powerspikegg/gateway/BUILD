load("@io_bazel_rules_scala//scala:scala.bzl", "scala_library", "scala_binary", "scala_test")

filegroup(
    name = "src",
    srcs = glob([
        "src/**/*",
    ]),
)

scala_binary(
    name = "server",
    srcs = [":src"],
    main_class = "gg.powerspike.Main",
    deps = [
        ":akka-http_2.11",
        ":grpc-all",
        "//powerspikegg/rawdata/fetcher:service_java",
    ],
)

# TODO(funkysayu): move this to the third_party directory
java_library(
    name = "akka-http_2.11",
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

java_library(
    name = "grpc-all",
    visibility = ["//visibility:public"],
    exports = [
        "@com_google_auth_google_auth_library_credentials_0_4_0//jar",
        "@com_google_code_findbugs_jsr305_3_0_0//jar",
        "@com_google_code_gson_gson_2_7//jar",
        "@com_google_errorprone_error_prone_annotations_2_0_11//jar",
        "@com_google_guava_guava_20_0//jar",
        "@com_google_instrumentation_instrumentation_api_0_3_0//jar",
        "@com_google_protobuf_nano_protobuf_javanano_3_0_0_alpha_5//jar",
        "@com_google_protobuf_protobuf_java_3_1_0//jar",
        "@com_google_protobuf_protobuf_java_util_3_1_0//jar",
        "@com_google_protobuf_protobuf_lite_3_0_1//jar",
        "@com_squareup_okhttp_okhttp_2_5_0//jar",
        "@com_squareup_okio_okio_1_6_0//jar",
        "@io_grpc_grpc_all_1_1_2//jar",
        "@io_grpc_grpc_auth_1_1_2//jar",
        "@io_grpc_grpc_context_1_1_2//jar",
        "@io_grpc_grpc_core_1_1_2//jar",
        "@io_grpc_grpc_netty_1_1_2//jar",
        "@io_grpc_grpc_okhttp_1_1_2//jar",
        "@io_grpc_grpc_protobuf_1_1_2//jar",
        "@io_grpc_grpc_protobuf_lite_1_1_2//jar",
        "@io_grpc_grpc_protobuf_nano_1_1_2//jar",
        "@io_grpc_grpc_stub_1_1_2//jar",
        "@io_netty_netty_buffer_4_1_8_Final//jar",
        "@io_netty_netty_codec_4_1_8_Final//jar",
        "@io_netty_netty_codec_http2_4_1_8_Final//jar",
        "@io_netty_netty_codec_http_4_1_8_Final//jar",
        "@io_netty_netty_codec_socks_4_1_8_Final//jar",
        "@io_netty_netty_common_4_1_8_Final//jar",
        "@io_netty_netty_handler_4_1_8_Final//jar",
        "@io_netty_netty_handler_proxy_4_1_8_Final//jar",
        "@io_netty_netty_resolver_4_1_8_Final//jar",
        "@io_netty_netty_transport_4_1_8_Final//jar",
    ],
)
