// Copyright 2017 PowerSpikeGG

#ifndef POWERSPIKEGG_SERVING_SRC_CONVERTER_H_
#define POWERSPIKEGG_SERVING_SRC_CONVERTER_H_

#include <map>
#include <string>
#include <vector>

#include "powerspikegg/serving/public/match_computation.pb.h"

namespace serving {

std::map<std::string, std::vector<double>> GetFormattedSummonerStats(
        const serving::MatchComputationRequest* request);

}  // namespace serving

#endif  // POWERSPIKEGG_SERVING_SRC_CONVERTER_H_
