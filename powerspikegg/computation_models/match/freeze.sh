#!/bin/bash

declare -a stats=("kills" "deaths" "assists" "minions_killed" "neutral_minions_killed" "total_damages" "total_heal" "wards_placed" "tower_kills") 

MODELS="/tmp/powerspikegg/models"

for stat in ${stats[@]}; do
    bazel run //powerspikegg/computation_models/match:freeze -- --model_folder "$MODELS/$stat" --output_folder "$MODELS/$stat"
done
