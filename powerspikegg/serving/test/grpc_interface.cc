// Copyright 2017 PowerSpikeGG

#include <gtest/gtest.h>
#include <grpc/grpc.h>
#include <grpc++/security/server_credentials.h>
#include <grpc++/create_channel.h>

#include <iostream>

#include "powerspikegg/serving/public/match_computation.grpc.pb.h"
#include "powerspikegg/serving/src/converter.h"
#include "powerspikegg/serving/src/server.h"

TEST(GRPC, TheServerMustExposeMatchComputationService) {
  auto channel = grpc::CreateChannel("localhost:50051",
          grpc::InsecureChannelCredentials());
  std::unique_ptr<serving::MatchComputation::Stub> stub(
          serving::MatchComputation::NewStub(channel));

  serving::MatchComputationRequest request;
  serving::MatchComputationFeature feature;
  grpc::ClientContext context;

  Server server;
  server.Run();

  grpc::Status status = stub->GetFeature(&context, request, &feature);
  EXPECT_TRUE(status.ok());

  if (!status.ok()) {
    std::cout << status.error_code() << ": " <<
        status.error_message() << std::endl;
  }

  server.Shutdown();
}

TEST(Converter, TheConverterMustReturnsAnAppropriateVector) {
    serving::MatchComputationRequest request;
    request.set_summoner_id(4242);

    game::leagueoflegends::TeamDetail* team =
        request.mutable_match()->mutable_detail()->add_teams();
    game::leagueoflegends::Participant* player = team->add_participants();
    player->mutable_summoner()->set_id(123456);

    player = team->add_participants();
    player->mutable_summoner()->set_id(4242);
    player->mutable_statistics()->set_kills(0);
    player->mutable_statistics()->set_deaths(1);
    player->mutable_statistics()->set_assists(2);
    player->mutable_statistics()->set_minions_killed(3);
    player->mutable_statistics()->set_neutral_minions_killed(4);
    player->mutable_statistics()->mutable_total_damages()->set_total(5);
    player->mutable_statistics()->set_total_heal(6);
    player->mutable_statistics()->set_wards_placed(7);
    player->mutable_statistics()->set_tower_kills(8);

    std::map<std::string, std::vector<double>> result =
        GetFormattedSummonerStats(&request);

    std::vector<std::string> expected_keys {
        "kills", "deaths", "assists", "minions_killed",
        "neutral_minions_killed", "total_damages", "total_heal",
        "wards_placed", "tower_kills",
    };
    ASSERT_EQ(expected_keys.size(), result.size()) <<
        "Result size is different than the expected key size.";

    for (unsigned i = 0; i < result.size(); ++i) {
        std::vector<double> expected_values;
        for (unsigned j = 0; j < result.size(); ++j) {
            if (i != j) {
                expected_values.push_back(j);
            }
        }

        std::string key = expected_keys[i];
        ASSERT_TRUE(result.find(key) != result.end()) << "Key " << key <<
            "was not present in the map.";

        std::vector<double> actual_values = result[expected_keys[i]];
        ASSERT_EQ(expected_values.size(), actual_values.size()) <<
            "Expected values size is different that actual values size.";
        for (unsigned j = 0; j < actual_values.size(); ++j) {
            EXPECT_EQ(expected_values[j], actual_values[j]) <<
                "Expected value does not match actual value.";
        }
    }
}

int main(int argc, char **argv) {
  ::testing::InitGoogleTest(&argc, argv);
  return RUN_ALL_TESTS();
}
