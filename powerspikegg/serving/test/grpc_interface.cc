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
    player->mutable_statistics()->set_kills(1);
    player->mutable_statistics()->set_deaths(2);
    player->mutable_statistics()->set_assists(3);
    player->mutable_statistics()->set_minions_killed(4);
    player->mutable_statistics()->set_neutral_minions_killed(5);
    player->mutable_statistics()->mutable_total_damages()->set_total(6);
    player->mutable_statistics()->set_total_heal(7);
    player->mutable_statistics()->set_wards_placed(8);
    player->mutable_statistics()->set_tower_kills(9);

    std::vector<double> result = GetFormattedSummonerStats(&request);
    for (unsigned int i = 0; i < result.size(); ++i)
        EXPECT_TRUE(result.at(i) == i + 1);
}

int main(int argc, char **argv) {
  ::testing::InitGoogleTest(&argc, argv);
  return RUN_ALL_TESTS();
}
