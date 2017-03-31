#include "server.h"

#include <grpc++/server_builder.h>
#include <grpc++/security/server_credentials.h>

#include <string>
#include <iostream>
#include <utility>

Server::Server() {
  this->port_ = 9004;
}

int Server::port() {
    return this->port_;
}

void Server::Run() {
  std::string server_address("0.0.0.0:50051");
  std::unique_ptr<MatchComputationImpl> match_service(
          new MatchComputationImpl());

  grpc::ServerBuilder builder;
  builder.AddListeningPort(server_address, grpc::InsecureServerCredentials());
  builder.RegisterService(match_service.get());

  std::unique_ptr<grpc::Server> server(builder.BuildAndStart());
  std::cout << "Server listening on " << server_address << std::endl;
  this->match_service = std::move(match_service);
  this->server = std::move(server);
}

void Server::Wait() {
  this->server->Wait();
}

void Server::Shutdown() {
  this->server->Shutdown();
}
