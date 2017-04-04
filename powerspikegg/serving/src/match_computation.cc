// Copyright 2017 PowerSpikeGG

#include "powerspikegg/serving/src/match_computation.h"

#include <iostream>
#include <utility>

#include "gflags/gflags.h"
#include "powerspikegg/computation_models/utils/src/graph.h"
#include "powerspikegg/serving/src/converter.h"


DEFINE_string(graph_path, "/tmp/frozen_model.pb", "");


MatchComputationImpl::MatchComputationImpl() :
    scope(tensorflow::Scope::NewRootScope()) {
    computation::utils::LoadGraphFromFile(this->scope, FLAGS_graph_path);

    // TODO(cassand) Remove once the all models are correctly loaded
    // Print all nodes in the grap
    for (tensorflow::Node* node : this->scope.graph()->nodes()) {
        std::cout << node->name() << std::endl;
    }
}

grpc::Status MatchComputationImpl::GetFeature(
        grpc::ServerContext* context,
        const serving::MatchComputationRequest* match,
        serving::MatchComputationFeature* feature) {
  serving::Statistics* stats = feature->mutable_expected_statistics();
  stats->mutable_kills()->set_value(5);
  return grpc::Status::OK;
}
