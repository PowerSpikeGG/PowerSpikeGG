#include "match_computation.h"

#include "tensorflow_serving/model_servers/server_core.h"

MatchComputationImpl::MatchComputationImpl() {
  tensorflow::serving::ServerCore::Options options;
  tensorflow::serving::ServerCore::Create(std::move(options), &this->core);
}

grpc::Status MatchComputationImpl::GetFeature(grpc::ServerContext* context, 
                                              const serving::MatchComputationRequest* match, 
                                              serving::MatchComputationFeature* feature) {
  return grpc::Status::OK;
}
