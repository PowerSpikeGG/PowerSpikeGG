#!/bin/bash
ROOT=$(PWD)
OUT="$ROOT/$1/dist"
GENDIR=$2


echo $GENDIR
echo $OUT

# Position the terminal into the frontend directory
cd "powerspikegg/frontend"
cat "package.json"

# Make a folder to cache npm fetching
export APPDATA="$ROOT/$GENDIR/.appdata"
echo "GENDIR: $GENDIR"
echo "APPDATA =>>> : $APPDATA"

# Install dependencies
npm install

# Compile client
echo "Pwd: "
echo $(pwd);

export USERPROFILE=$APPDATA
export HOME=$APPDATA
./node_modules/.bin/ng build --output-path $OUT


