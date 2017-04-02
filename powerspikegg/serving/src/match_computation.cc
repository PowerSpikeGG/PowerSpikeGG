#include "match_computation.h"

#include <iostream>
#include <utility>

MatchComputationImpl::MatchComputationImpl() {}

grpc::Status MatchComputationImpl::GetFeature(
        grpc::ServerContext* context,
        const serving::MatchComputationRequest* match,
        serving::MatchComputationFeature* feature) {
  feature->set_result("hello" + match->model_name());
  std::cout << "Return response " << std::endl;
  return grpc::Status::OK;
}
