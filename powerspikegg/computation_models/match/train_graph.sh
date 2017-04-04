#!/bin/bash

stats=(kills deaths assists minions_killed neutral_minions_killed total_damages total_heal wards_placed tower_kills) 

models="/tmp/powerspikegg/models"

for stat in ${stats[*]}; do
    bazel run //powerspikegg/computation_models/match:train_graph -- --model_path "$models/$stat/model.ckpt" --iteration 50 --learning_rate 10 --field_name $stat --fetcher_address funkysayu.fr:50001
done
