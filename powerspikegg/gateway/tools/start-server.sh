#!/bin/bash

##
# Start the gateway server, ensure that the fetcher server is running before this one
# No dependencies needed (except java 8 and bazel)

bazel run //powerspikegg/gateway:server