#include "graph.h"

namespace computation {
namespace utils {

tensorflow::Node* FindNodeWithNameInGraph(tensorflow::Graph* graph,
                                          std::string name) {
    for (tensorflow::Node* node : graph->nodes()) {
        if (node->name() == name) return node;
    }

    return nullptr;
}

tensorflow::Output GenerateOutputFromNode(tensorflow::Graph* graph,
                                          std::string name) {
    tensorflow::Node* node = FindNodeWithNameInGraph(graph, name);
    return tensorflow::Output(node);
}

void LoadGraphFromDefinition(tensorflow::Scope& scope,
                             tensorflow::GraphDef& gDef) {
    tensorflow::GraphConstructorOptions options;
    tensorflow::ConvertGraphDefToGraph(options, gDef, scope.graph());
}

void LoadGraphFromFile(tensorflow::Scope& scope, std::string filename) {
    tensorflow::GraphDef gDef;
    tensorflow::ReadBinaryProto(tensorflow::Env::Default(), filename, &gDef);

    LoadGraphFromDefinition(scope, gDef);
}
}  // namespace computation
}  // namespace utils
