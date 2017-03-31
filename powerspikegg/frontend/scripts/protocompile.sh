#!/bin/bash

##
# name: protocompile
# author: Axel Martin
# description: Compile protobuf description to typescript models
#
# NOTE: this is a workaround to generate sources for typescript completion

ROOT=$(pwd)
INPUT="$1"
shift
OUTPUT="$1"

if [[ -z "$INPUT" || -z "$OUTPUT" ]]; then
    echo "usage: protocompile <input> <output>"
    echo "Compiles a .proto definition into a typescript model."
    exit 1
fi

THIS_SCRIPT_DIR="$(dirname "${BASH_SOURCE[0]}")"
NODE_MODULES="$THIS_SCRIPT_DIR/../node_modules"
pbjstool="$NODE_MODULES/protobufjs/bin/pbjs"
jststool="$NODE_MODULES/proto2ts/command.js"
tsfmt="$NODE_MODULES/typescript-formatter/bin/tsfmt"

if [ ! -x "$pbjstool" ]; then
    echo "Error: $pbjstool script not found"
    exit 1
fi

if [ ! -x "$jststool" ]; then
    echo "Error: $jststool script not found"
    exit 1
fi

pbdescriptor=$(mktemp)

set -e
node $pbjstool --path $THIS_SCRIPT_DIR/../../../ $INPUT > "$pbdescriptor"
$jststool --file $pbdescriptor | $tsfmt --stdin > "$OUTPUT"

rm $pbdescriptor
