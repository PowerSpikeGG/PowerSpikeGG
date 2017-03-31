package(default_visibility = ["//visibility:public"])

load("@tf_serving//tensorflow_serving:serving.bzl", "serving_proto_library")
load("@protobuf//:protobuf.bzl", "cc_proto_library")

cc_binary(
	name = "main",
	srcs = ["src/main.cc"],
	deps = [":server"]	
)

cc_library(
	name = "server",
	srcs = ["src/server.cc"],
	hdrs = ["src/server.h"],
	deps = [":computation_service"]
)

cc_library(
	name = "computation_service",
	srcs = ["src/match_computation.cc"],
	hdrs = ["src/match_computation.h"],
	deps = [
		":match_computation",
		"@tf_serving//tensorflow_serving/model_servers:server_core"
	]
)

serving_proto_library(
    	name = "match_computation",
    	srcs = [
		"public/match_computation.proto",
	],
	deps = [
		"//powerspikegg/rawdata/public:leagueoflegends_cc"
		],
	cc_grpc_version = 2
)

cc_test(
    name = "grpc_interface",
    srcs = [
        "test/grpc_interface.cc"
    ],
    deps = [
            "@gtest//:lib",
            ":match_computation",
            ":server",
    ],
    linkstatic = 1,
)

cc_binary(
    name = "greeter_server",
    srcs = ["tmp/greeter_server.cc"],
    deps = [
        ":match_computation",
		"@tf_serving//tensorflow_serving/model_servers:server_core"
   ]
)

cc_binary(
   name = "greeter_client",
   srcs = ["tmp/greeter_client.cc"],
   deps = [
		"@grpc//:grpc++",
        ":match_computation",
   ]
)

serving_proto_library(
	name = "helloworld",
    srcs = ["tmp/helloworld.proto"],
	cc_grpc_version = 2
)
