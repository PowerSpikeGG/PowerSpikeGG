#include "graph.h"

#include "tensorflow/cc/ops/standard_ops.h"

namespace computation {
namespace simple {

tensorflow::GraphDef BuildGraph() {
    tensorflow::Scope root = tensorflow::Scope::NewRootScope();

    auto A = tensorflow::ops::Const(root, {{3.f, 2.f}, {-1.f, 0.f}});
    auto b = tensorflow::ops::Const(root, {{3.f, 5.f}});

    auto v = tensorflow::ops::MatMul(root.WithOpName("v"), A, b,
                                     tensorflow::ops::MatMul::TransposeB(true));

    tensorflow::GraphDef gDef;

    root.ToGraphDef(&gDef);

    return gDef;
}

}
}
