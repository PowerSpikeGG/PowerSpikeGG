#include "match_computation.h"

#include <iostream>
#include <utility>

MatchComputationImpl::MatchComputationImpl() {
  tensorflow::serving::ServerCore::Options options;
  tensorflow::serving::ServerCore::Create(std::move(options), &this->core);
}

grpc::Status MatchComputationImpl::GetFeature(
        grpc::ServerContext* context,
        const serving::MatchComputationRequest* match,
        serving::MatchComputationFeature* feature) {
  serving::Statistics* stats = feature->mutable_statistics();
  stats->mutable_kills()->set_value(5);
  return grpc::Status::OK;
}
