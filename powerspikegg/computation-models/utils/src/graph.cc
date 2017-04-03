#include "graph.h"

namespace computation {
namespace utils {

tensorflow::Node* FindNodeWithNameInGraph(tensorflow::Graph* graph,
                                          std::string name) {
    for (tensorflow::Node* node : graph->nodes()) {
        if (node->name() == name) return node;
    }

    return NULL;
}

void LoadGraphFromDefinition(tensorflow::Scope &scope, tensorflow::GraphDef &gDef) {
    tensorflow::GraphConstructorOptions options;
    tensorflow::ConvertGraphDefToGraph(options, gDef, scope.graph());
}

}
}
