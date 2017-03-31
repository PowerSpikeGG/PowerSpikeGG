#include <gtest/gtest.h>
#include <grpc/grpc.h>
#include <grpc++/security/server_credentials.h>
#include <grpc++/create_channel.h>

#include <iostream>

#include "powerspikegg/serving/public/match_computation.grpc.pb.h"
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

int main(int argc, char **argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}
