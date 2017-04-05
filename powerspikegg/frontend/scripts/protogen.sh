#!/bin/bash

##
# name: protogen.sh
# description: Generates proto directly in the code base, so the developper
#              can get some completion in typescript.
#
# Arguments:
#   1: Bazel output file to generate
#   2: Directory where the proto should be generated
#   @: Any protos that should be compiled.

set -e

ROOT="$(pwd)"
BAZEL_OUT="$ROOT/$1"
shift
PROTO_OUT="$1"
shift

pbjs="$(pwd)/powerspikegg/frontend/node_modules/.bin/pbjs"
pbts="$(pwd)/powerspikegg/frontend/node_modules/.bin/pbts"


# Compile the protobufs
"$pbjs" -t static-module -w commonjs -o "$PROTO_OUT/bundle.js" $@
cd "$PROTO_OUT"
"$pbts" -o "bundle.d.ts" "bundle.js"

# Output a file for bazel checks
echo "done" > "$BAZEL_OUT/protogen.txt"
