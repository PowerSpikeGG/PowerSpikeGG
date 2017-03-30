#include "match_computation.h"

grpc::Status MatchComputationImpl::GetFeature(grpc::ServerContext* context, const serving::MatchComputationRequest* match, serving::MatchComputationFeature* feature) {
  return grpc::Status::OK;
}
