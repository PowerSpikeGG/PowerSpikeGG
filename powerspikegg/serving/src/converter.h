// Copyright 2017 PowerSpikeGG

#ifndef POWERSPIKEGG_SERVING_SRC_CONVERTER_H_
#define POWERSPIKEGG_SERVING_SRC_CONVERTER_H_

#include <vector>

#include "powerspikegg/serving/public/match_computation.pb.h"

namespace serving {

std::vector<double> GetFormattedSummonerStats(
        const serving::MatchComputationRequest* request);

}  // namespace serving

#endif  // POWERSPIKEGG_SERVING_SRC_CONVERTER_H_
