#ifndef POWERSPIKEGG_SERVING_SRC_SERVER_H_
#define POWERSPIKEGG_SERVING_SRC_SERVER_H_

#include <grpc/grpc.h>
#include <grpc++/server.h>

#include <memory>

#include "match_computation.h"

class Server {
 public:
    Server();
    int port();
    void Run();
    void Wait();
    void Shutdown();

 private:
    int port_;
    std::unique_ptr<grpc::Server> server;
    std::unique_ptr<MatchComputationImpl> match_service;
};

#endif  // POWERSPIKEGG_SERVING_SRC_SERVER_H_

