#include <memory>
#include <grpc/grpc.h>
#include <grpc++/server.h>

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
