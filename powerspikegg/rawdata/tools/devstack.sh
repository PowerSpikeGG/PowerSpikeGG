#!/bin/bash

##
# name: devstack.sh
# brief: Set up a development stack of the rawdata module.
# author: Axel Martin
# licence: GPLv3
#

RIOT_API_TOKEN_PATH="config/development/riot-api-token.txt"

usage () {
    echo "usage: $0"
    echo
    echo "  Set up a development stack of the rawdata module."
}

exit_error () {
    echo "ERROR: $@"
    echo
    usage
    exit 1
}

# Find WORKSPACE root directory
while [ ! -f WORKSPACE ] && [ "$PWD" != "/" ]
do
    cd ../
done
[ ! -f WORKSPACE ] && exit_error "WORKSPACE file not found. Aborting..."

# Recover Riot API token
if [ ! -f "$RIOT_API_TOKEN_PATH" ]; then
    exit_error "Missing Riot API token. Expected to be seen in $RIOT_API_TOKEN_PATH"
fi
RIOT_API_TOKEN=$(cat $RIOT_API_TOKEN_PATH)

# Create Mongo DB runtime context
mongo_runtime_dir=$(mktemp -d)
mongo_data_dir="$mongo_runtime_dir/data"
mongo_pidfile="$mongo_runtime_dir/pid"
mkdir $mongo_data_dir

# Build first
bazel build //powerspikegg/rawdata/fetcher:server \
            @com_mongodb_binary//:server || exit_error "Unable to build."

bazel-genfiles/external/com_mongodb_binary/mongod \
    --pidfilepath=$mongo_pidfile \
    --dbpath=$mongo_data_dir &

bazel-bin/powerspikegg/rawdata/fetcher/server \
    --riot_api_token=$RIOT_API_TOKEN

# Cleanup
rm -fr $mongo_runtime_dir
