#include "server.h"

#include <grpc++/server_builder.h>
#include <grpc++/security/server_credentials.h>

#include <iostream>
#include <utility>

Server::Server(std::string server_address) : server_address_(server_address) {}
Server::Server() : Server("0.0.0.0:50051") {}

void Server::Run() {
  std::unique_ptr<MatchComputationImpl> match_service(
          new MatchComputationImpl());

  grpc::ServerBuilder builder;
  builder.AddListeningPort(server_address_, grpc::InsecureServerCredentials());
  builder.RegisterService(match_service.get());

  std::unique_ptr<grpc::Server> server(builder.BuildAndStart());
  std::cout << "Server listening on " << server_address_ << std::endl;
  this->match_service = std::move(match_service);
  this->server = std::move(server);
}

void Server::Wait() {
  this->server->Wait();
}

void Server::Shutdown() {
  this->server->Shutdown();
}
