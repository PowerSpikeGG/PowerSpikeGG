// Copyright 2017 PowerSpikeGG

#include "powerspikegg/serving/src/match_computation.h"

#include <iostream>
#include <utility>
#include <vector>

#include "gflags/gflags.h"
#include "powerspikegg/computation_models/utils/src/graph.h"
#include "powerspikegg/serving/src/converter.h"

DEFINE_string(model_directory, "/tmp/powerspikegg/models", "");

MatchComputationImpl::MatchComputationImpl() {
    this->contexts.emplace(std::make_pair("kills", "kills"));
}

grpc::Status MatchComputationImpl::GetFeature(
    grpc::ServerContext* context, const serving::MatchComputationRequest* match,
    serving::MatchComputationFeature* feature) {
    serving::Statistics* stats = feature->mutable_expected_statistics();

    auto kills = this->contexts.find("kills");
    if (kills != this->contexts.end()) {
        std::vector<float> input;
        stats->mutable_kills()->set_value(kills->second.compute(input));
    }

    return grpc::Status::OK;
}
