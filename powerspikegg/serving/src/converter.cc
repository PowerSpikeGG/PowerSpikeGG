// Copyright 2017 PowerSpikeGG

#include "powerspikegg/serving/src/converter.h"

#include <stdlib.h>


namespace serving {

std::vector<double> ConvertStatToVector(
        const game::leagueoflegends::PlayerStatistics& stats) {
    std::vector<double> v {
        static_cast<double>(stats.kills()),
        static_cast<double>(stats.deaths()),
        static_cast<double>(stats.assists()),
        static_cast<double>(stats.minions_killed()),
        static_cast<double>(stats.neutral_minions_killed()),
        static_cast<double>(stats.total_damages().total()),
        static_cast<double>(stats.total_heal()),
        static_cast<double>(stats.wards_placed()),
        static_cast<double>(stats.tower_kills()),
    };

    return v;
}

std::vector<double> GetFormattedSummonerStats(
        const serving::MatchComputationRequest* request) {
    for (int i = 0; i < request->match().detail().teams_size(); ++i) {
        const game::leagueoflegends::TeamDetail& team =
            request->match().detail().teams(i);

        for (int j = 0; j < team.participants_size(); ++j) {
            const game::leagueoflegends::Participant& participant =
                team.participants(j);

            if (participant.summoner().id() == request->summoner_id()) {
                return ConvertStatToVector(participant.statistics());
            }
        }
    }
}

}  // namespace serving
