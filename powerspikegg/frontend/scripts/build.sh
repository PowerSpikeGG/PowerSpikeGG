#!/bin/bash
ROOT=$(pwd)
OUT_DIR="$ROOT/$1"
GENDIR="$ROOT/$2"

# Position the terminal into the frontend directory
cd "powerspikegg/frontend"

# Compile client
export USERPROFILE="$ROOT/$GENDIR/.appdata"
export HOME=$USERPROFILE

./node_modules/.bin/ng build --output-path "$OUT_DIR"
