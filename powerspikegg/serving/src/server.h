#ifndef POWERSPIKEGG_SERVING_SRC_SERVER_H_
#define POWERSPIKEGG_SERVING_SRC_SERVER_H_

#include <grpc/grpc.h>
#include <grpc++/server.h>

#include <memory>
#include <string>

#include "match_computation.h"

class Server {
 public:
    Server();
    Server(std::string server_address);
    void Run();
    void Wait();
    void Shutdown();

 private:
    std::string server_address_;
    std::unique_ptr<grpc::Server> server;
    std::unique_ptr<MatchComputationImpl> match_service;
};

#endif  // POWERSPIKEGG_SERVING_SRC_SERVER_H_
