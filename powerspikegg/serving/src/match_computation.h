#include <grpc/grpc.h>
#include <grpc++/server.h>
#include <grpc++/server_builder.h>
#include <grpc++/server_context.h>
#include "powerspikegg/serving/public/match_computation.grpc.pb.h"

class MatchComputationImpl final : public serving::MatchComputation::Service {

    grpc::Status GetFeature(grpc::ServerContext* context, const serving::MatchComputationRequest* match, serving::MatchComputationFeature* feature); 


};
