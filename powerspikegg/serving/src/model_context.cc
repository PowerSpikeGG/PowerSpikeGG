#include "model_context.h"

#include <string>
#include <vector>

namespace serving {

ModelContext::ModelContext(std::string model_path)
    : scope_(tensorflow::Scope::NewRootScope()), session_(scope_) {
    std::string full_path =
        "/data/projects/PowerSpikeGG/powerspikegg/computation_models/static/"
        "generated/" +
        model_path + "/frozen_model.pb";

    computation::utils::LoadGraphFromFile(this->scope_, full_path);

    // TODO(cassand): To remove
    for (tensorflow::Node* node : this->scope_.graph()->nodes()) {
        std::cout << node->name() << std::endl;
    }

    this->logits = computation::utils::GenerateOutputFromNode(this->scope_.graph(), "logits");
    this->logits = computation::utils::GenerateOutputFromNode(this->scope_.graph(), "placeholder");
}

int ModelContext::compute(std::vector<float> input) { 
    std::vector<tensorflow::Tensor> outputs;
    this->session_.Run({
                {this->inputs, {{input.at(0), input.at(1),input.at(2), input.at(3), input.at(4), input.at(5), input.at(6), input.at(7) }}}
                },{this->logits},&outputs);
    std::cout << outputs[0].matrix<float>() << std::endl; 
    return 1;
}
}
