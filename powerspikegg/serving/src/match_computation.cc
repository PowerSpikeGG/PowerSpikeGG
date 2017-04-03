#include "match_computation.h"

#include <iostream>
#include <utility>

MatchComputationImpl::MatchComputationImpl() {}

grpc::Status MatchComputationImpl::GetFeature(
        grpc::ServerContext* context,
        const serving::MatchComputationRequest* match,
        serving::MatchComputationFeature* feature) {
  serving::Statistics* stats = feature->mutable_expected_statistics();
  stats->mutable_kills()->set_value(5);
  return grpc::Status::OK;
}
