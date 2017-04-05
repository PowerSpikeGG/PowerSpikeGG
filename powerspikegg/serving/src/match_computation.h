#ifndef POWERSPIKEGG_SERVING_SRC_MATCH_COMPUTATION_H_
#define POWERSPIKEGG_SERVING_SRC_MATCH_COMPUTATION_H_

#include <grpc++/grpc++.h>

#include <unordered_map>
#include <memory>
#include <string>

#include "tensorflow/cc/ops/standard_ops.h"
#include "powerspikegg/serving/public/match_computation.grpc.pb.h"

#include "model_context.h"

class MatchComputationImpl final : public serving::MatchComputation::Service {
 public:
    /**
     * Intstanciate a new Tensorflow Serving ServerCore to execute Tensorflow
     * models
     **/ 
    MatchComputationImpl();

    /**
     * Use the Tensorflow models specified in the request to compute 
     * featues for the match given in the request
     **/
    grpc::Status GetFeature(grpc::ServerContext* context,
                            const serving::MatchComputationRequest* match,
                            serving::MatchComputationFeature* feature);

 private:
    std::unordered_map<std::string, serving::ModelContext> contexts;
};

#endif  // POWERSPIKEGG_SERVING_SRC_MATCH_COMPUTATION_H_
