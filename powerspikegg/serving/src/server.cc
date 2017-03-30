#include "server.h"

#include <memory>
#include <string>
#include <iostream>
#include <grpc/grpc.h>
#include <grpc++/server.h>
#include <grpc++/server_builder.h>
#include <grpc++/security/server_credentials.h>

#include "match_computation.h"


Server::Server() {
	this->port_ = 9000;
}

int Server::port () {
 return this->port_;
}

void Server::Run () {
	std::string server_address("0.0.0.0:9000");
	MatchComputationImpl match_service;

	grpc::ServerBuilder builder;
	builder.AddListeningPort(server_address, grpc::InsecureServerCredentials());
	builder.RegisterService(&match_service);

	std::unique_ptr<grpc::Server> server(builder.BuildAndStart());
	std::cout << "Server listening on " << server_address << std::endl;

	server->Wait();
}
