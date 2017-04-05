#ifndef POWERSPIKEGG_SERVING_SRC_MODEL_CONTEXT_H_
#define POWERSPIKEGG_SERVING_SRC_MODEL_CONTEXT_H_

#include <vector>

#include "tensorflow/cc/client/client_session.h"
#include "tensorflow/cc/ops/standard_ops.h"
#include "tensorflow/core/framework/tensor.h"

#include "powerspikegg/computation_models/utils/src/graph.h"

namespace serving {
class ModelContext {
   public:
    ModelContext(std::string model_path);
    int compute(std::vector<double> input);

   private:
    tensorflow::Scope scope_;
    tensorflow::ClientSession session_;
    tensorflow::Output logits;
    tensorflow::Output inputs;
};
}

#endif  // POWERSPIKEGG_SERVING_SRC_MODEL_CONTEXT_H_
