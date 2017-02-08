package main

import (
	"flag"
	"fmt"
	"net"
	"sync"
	"testing"

	"github.com/golang/protobuf/proto"
	"github.com/google/subcommands"
	"golang.org/x/net/context"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"

	fetcherpb "powerspike.gg/powerspikegg/rawdata/fetcher/service_gopb"
	lolpb "powerspike.gg/powerspikegg/rawdata/public/leagueoflegends_gopb"
)

const (
	testPort = ":50051"
)

type mockMatchFetcherServer struct {
	fetcherpb.MatchFetcherServer

	server *grpc.Server

	// request contains the request sent by the client
	requests []*fetcherpb.MatchRequest
	// response contains the response to send back to the client
	response *lolpb.MatchReference
	// err contains an eventual error to throw back to the client
	err error
}

func newMockMatchFetcherServer(port string) (*mockMatchFetcherServer, error) {
	lis, err := net.Listen("tcp", port)
	if err != nil {
		return nil, fmt.Errorf("failed to listen: %v", err)
	}
	mock := &mockMatchFetcherServer{}
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
func (s *mockMatchFetcherServer) Match(_ context.Context, req *fetcherpb.MatchRequest) (*lolpb.MatchReference, error) {
	s.requests = append(s.requests, req)

	if s.err != nil {
		return nil, s.err
	}
	return s.response, nil
}

// Resets the mock requests sent list
func (s *mockMatchFetcherServer) reset() {
	s.requests = nil
}

// TestMatchCommand ensures match command correctly recovers matchs from the fetcher
func TestMatchCommand(t *testing.T) {
	testValues := []struct {
		name             string
		args             []string
		serverResponse   *lolpb.MatchReference
		serverError      error
		expectedRequests []*fetcherpb.MatchRequest
		expectedStatus   subcommands.ExitStatus
	}{
		{
			name: "single normal query default region",
			args: []string{"123"},
			serverResponse: &lolpb.MatchReference{
				Id: 123,
			},
			serverError: nil,
			expectedRequests: []*fetcherpb.MatchRequest{
				{
					Id:     123,
					Region: defaultRegion,
				},
			},
			expectedStatus: subcommands.ExitSuccess,
		},
	}

	s, err := newMockMatchFetcherServer(testPort)
	defer s.server.Stop()
	if err != nil {
		t.Fatalf("unable to create test server: %v", err)
	}
	addressFlag := "--address=" + testPort

	for _, testValue := range testValues {
		s.reset()
		s.response = testValue.serverResponse
		s.err = testValue.serverError

		f := flag.NewFlagSet(testValue.name, flag.PanicOnError)
		c := &matchCommand{
			waitGroup:    &sync.WaitGroup{},
			displayMutex: &sync.Mutex{},
		}
		c.SetFlags(f)

		args := append([]string{addressFlag}, testValue.args...)
		if err := f.Parse(args); err != nil {
			t.Fatalf("error while parsing test given flags: %v", err)
		}

		status := c.Execute(context.Background(), f)
		if status != testValue.expectedStatus {
			t.Fatalf("command returned an unexpected status: %v", err)
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
