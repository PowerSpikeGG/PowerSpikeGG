#include "graph.h"

#include <vector>
#include <iostream>
#include "tensorflow/cc/ops/standard_ops.h"
#include "tensorflow/cc/client/client_session.h"
#include "tensorflow/core/platform/env.h"

#include "tensorflow/core/platform/protobuf_internal.h"
#include "tensorflow/core/protobuf/saved_model.pb.h"
#include "tensorflow/core/public/session.h"
#include "tensorflow/core/public/session_options.h"
#include "tensorflow/core/util/tensor_bundle/naming.h"

//#include "tensorflow/cc/saved_model/constants.h"
#include "tensorflow/core/lib/io/path.h"
#include "tensorflow/core/lib/monitoring/counter.h"

#include "powerspikegg/computation-models/utils/src/graph.h"

int main() {
    tensorflow::Scope root = tensorflow::Scope::NewRootScope();

    tensorflow::GraphDef gDef; //= computation::simple::BuildGraph();
    tensorflow::ReadBinaryProto(tensorflow::Env::Default(),"/tmp/frozen_model.pb", &gDef);

    tensorflow::GraphConstructorOptions options;
    tensorflow::ConvertGraphDefToGraph(options, gDef, root.graph());

    std::cout << root.graph()->num_nodes() << std::endl;

    for (tensorflow::Node* node : root.graph()->nodes()) {
        std::cout << node->name() << std::endl;
    }

    tensorflow::Node* node = computation::utils::FindNodeWithNameInGraph(root.graph(), "serve");
    tensorflow::Output output = tensorflow::Output(node);

    tensorflow::Node* node2 = computation::utils::FindNodeWithNameInGraph(root.graph(), "Placeholder");
    tensorflow::Output output2 = tensorflow::Output(node2);

    tensorflow::ClientSession session(root);

    std::vector<tensorflow::Tensor> outputs;
    TF_CHECK_OK(session.Run({{output2, {{1.f,2.f}} }}, {output}, &outputs));

    LOG(INFO) << outputs[0].matrix<float>();

    return 0;
}
