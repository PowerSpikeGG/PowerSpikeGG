package main

import (
	"flag"
	"fmt"
	"net"
	"testing"

	"github.com/golang/protobuf/proto"
	"github.com/google/subcommands"
	"golang.org/x/net/context"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"

	fetcherpb "powerspike.gg/powerspikegg/rawdata/fetcher/service_gopb"
	lolpb "powerspike.gg/powerspikegg/rawdata/public/leagueoflegends_gopb"
)

type mockSummonerFetcherServer struct {
	fetcherpb.MatchFetcherServer

	server *grpc.Server

	// request contains the request sent by the client
	requests []*lolpb.Summoner
	// response contains the response to send back to the client
	response *lolpb.MatchReference
	// err contains an eventual error to throw back to the client
	err error
	// address contains the server address
	address string
}

func newMockSummonerFetcherServer() (*mockSummonerFetcherServer, error) {
	lis, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		return nil, fmt.Errorf("failed to listen: %v", err)
	}
	mock := &mockSummonerFetcherServer{
		address: lis.Addr().String(),
	}
	mock.server = grpc.NewServer()
	fetcherpb.RegisterMatchFetcherServer(mock.server, mock)
	// Register reflection service on gRPC server.
	reflection.Register(mock.server)

	go func(s *grpc.Server, l net.Listener) {
		s.Serve(l)
	}(mock.server, lis)
	return mock, nil
}

// Mock of the match endpoint
func (s *mockSummonerFetcherServer) UpdateSummoner(req *lolpb.Summoner, resp fetcherpb.MatchFetcher_UpdateSummonerServer) error {
	s.requests = append(s.requests, req)

	if s.err != nil {
		return s.err
	}

	resp.Send(s.response)

	return nil
}

// Resets the mock requests sent list
func (s *mockSummonerFetcherServer) reset() {
	s.requests = nil
}

// TestSummonerCommand ensures summoner command correctly recovers summoners' matchs from the fetcher
func TestSummonerCommand(t *testing.T) {
	testValues := []struct {
		name             string
		args             []string
		serverResponse   *lolpb.MatchReference
		serverError      error
		expectedRequests []*lolpb.Summoner
		expectedStatus   subcommands.ExitStatus
	}{
		{
			name: "single normal query default region",
			args: []string{"Rangork"},
			serverResponse: &lolpb.MatchReference{
				Id: 4242,
			},
			serverError: nil,
			expectedRequests: []*lolpb.Summoner{
				{
					Name:   "Rangork",
					Region: defaultRegion,
				},
			},
			expectedStatus: subcommands.ExitSuccess,
		},
		{
			name:             "single normal query with wrong region",
			args:             []string{"-region=Foobar", "Rangork"},
			serverResponse:   nil,
			serverError:      nil,
			expectedRequests: nil,
			expectedStatus:   subcommands.ExitFailure,
		},
	}

	s, err := newMockSummonerFetcherServer()
	if err != nil {
		t.Fatalf("unable to create test server: %v", err)
	}
	defer s.server.Stop()
	addressFlag := "--address=" + s.address

	for _, testValue := range testValues {
		s.reset()
		s.response = testValue.serverResponse
		s.err = testValue.serverError

		f := flag.NewFlagSet(testValue.name, flag.PanicOnError)
		c := &summonerCommand{}
		c.SetFlags(f)

		args := append([]string{addressFlag}, testValue.args...)
		if err := f.Parse(args); err != nil {
			t.Fatalf("error while parsing test given flags: %v", err)
		}

		status := c.Execute(context.Background(), f)
		if status != testValue.expectedStatus {
			t.Fatalf("command returned an unexpected status: %v", status)
		}
		if len(s.requests) != len(testValue.expectedRequests) {
			t.Fatalf("command sent innapropriate number of requests: expected %d got %d",
				len(testValue.expectedRequests), len(s.requests))
		}
		for _, expected := range testValue.expectedRequests {
			found := false
			for _, sent := range s.requests {
				if proto.Equal(sent, expected) {
					found = true
					break
				}
			}
			if !found {
				t.Fatalf("command did not send expected request %s", proto.MarshalTextString(expected))
			}
		}
	}
}
