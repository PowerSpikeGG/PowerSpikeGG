#ifndef POWERSPIKEGG_COMPUTATION_MODELS_UTILS_GRAPH_H
#define POWERSPIKEGG_COMPUTATION_MODELS_UTILS_GRAPH_H

#include "tensorflow/cc/client/client_session.h"
#include "tensorflow/core/framework/graph.pb.h"
#include "tensorflow/core/graph/graph_constructor.h"

namespace computation {
namespace utils {

tensorflow::Node* FindNodeWithNameInGraph(tensorflow::Graph* graph,
                                          std::string name);

void LoadGraphFromDefinition(tensorflow::Scope& scope,
                             tensorflow::GraphDef& gDef);


void LoadGraphFromFile(tensorflow::Scope& scope,
                        std::string filename);

tensorflow::Output GenerateOutputFromNode(tensorflow::Graph* graph, std::string name); 
}
}

#endif  // POWERSPIKEGG_COMPUTATION_MODELS_UTILS_GRAPH_H
