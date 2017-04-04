#!/bin/bash

stats=(kills deaths assists minions_killed neutral_minions_killed total_damages total_heal wards_placed tower_kills) 

models="/tmp/powerspikegg/models"

rm -rf $models
mkdir $models

for stat in ${stats[*]}; do
    echo $stat
    echo "$models/$stat"
    bazel run //powerspikegg/computation_models/match:generate_graph -- --model_dir "$models/$stat"
done
