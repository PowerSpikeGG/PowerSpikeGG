#include "model_context.h"

#include <string>
#include <vector>

namespace serving {

ModelContext::ModelContext(std::string model_path)
    : scope_(tensorflow::Scope::NewRootScope()), session_(scope_) {
    std::string full_path = "/data/projects/PowerSpikeGG/powerspikegg/" +
                            "computation_models/static/generated/" +
                            model_path + "/frozen_model.pb";

    std::cout << full_path << std::endl;

    computation::utils::LoadGraphFromFile(this->scope_, full_path);

    for (tensorflow::Node* node : this->scope_.graph()->nodes()) {
        std::cout << node->name() << std::endl;
    }
}

int ModelContext::compute(std::vector<float> input) { return 1; }
}
