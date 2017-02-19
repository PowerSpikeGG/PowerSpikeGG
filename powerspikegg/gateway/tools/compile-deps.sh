#!/bin/bash

##
# Compile the dependencies needed to develop the gateway,
# this is only needed if you plan to use an IDE to compile the gateway instead of bazel
# Sbt is needed for development, build.sbt mirror the bazel BUILD file

bazel build //powerspikegg/rawdata/fetcher:service_java