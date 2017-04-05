// Copyright 2017 PowerSpikeGG

#include "powerspikegg/serving/src/converter.h"

#include <assert.h>
#include <stdlib.h>


namespace serving {

const std::vector<std::string> FIELDS_NAME_CORRESPONDANCE {
    "kills", "deaths", "assists", "minions_killed",
    "neutral_minions_killed", "total_damages", "total_heal",
    "wards_placed", "tower_kills",
};

std::map<std::string, std::vector<double>> ConvertStatToMap(
        const game::leagueoflegends::PlayerStatistics& stats) {
    std::vector<double> stat_vector {
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

    assert(stat_vector.size() == FIELDS_NAME_CORRESPONDANCE.size());

    // Build a map of name stat to vector containing all stats except the
    // one named.
    std::map<std::string, std::vector<double>> named_vectors;
    for (unsigned i = 0; i < stat_vector.size(); ++i) {
        std::string name = FIELDS_NAME_CORRESPONDANCE[i];
        std::vector<double> formatted_stats;

        for (unsigned j = 0; j < stat_vector.size(); ++j) {
            if (i != j) {
                formatted_stats.push_back(stat_vector[j]);
            }
        }
        named_vectors[name] = formatted_stats;
    }

    return named_vectors;
}

std::map<std::string, std::vector<double>> GetFormattedSummonerStats(
        const serving::MatchComputationRequest* request) {
    for (int i = 0; i < request->match().detail().teams_size(); ++i) {
        const game::leagueoflegends::TeamDetail& team =
            request->match().detail().teams(i);

        for (int j = 0; j < team.participants_size(); ++j) {
            const game::leagueoflegends::Participant& participant =
                team.participants(j);

            if (participant.summoner().id() == request->summoner_id()) {
                return ConvertStatToMap(participant.statistics());
            }
        }
    }
}

}  // namespace serving
