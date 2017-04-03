# Create a model in python and execute in C++ 
 
## Generating the model 
 
To generate the model execute the script graph.py, this will export the trained model in the directory
 log 
 
## Export the model 
 
Now we have to inject the variables (neural network weight) as static nodes in the graph to do that
use the script "freeze.py --model_folder log". This will generate the file log/frozen_model.pb.

To make the model available for the c++ copy the graph (frozen_model.pb) to /tmp

## Execute the model

To execute the script with a static input run "bazel build //powerspikegg/computation-models/simple:simple_model"
~
