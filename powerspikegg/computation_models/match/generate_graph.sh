#!/bin/bash

declare -a stats=("kills" "deaths" "assists" "minions_killed" "neutral_minions_killed" "total_damages" "total_heal" "wards_placed" "tower_kills") 

MODELS="/tmp/powerspikegg/models"

rm -rf $MODELS
mkdir $MODELS

for stat in ${stats[@]}; do
    bazel run //powerspikegg/computation_models/match:generate_graph -- --model_dir "$MODELS/$stat" 
done
