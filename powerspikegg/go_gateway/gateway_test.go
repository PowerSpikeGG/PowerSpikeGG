package main

import (
	"fmt"
	"net"
	"net/http"
	"net/http/httptest"
	"testing"

	"golang.org/x/net/context"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"

	fetcherpb "powerspike.gg/powerspikegg/rawdata/fetcher/service_gopb"
	lolpb "powerspike.gg/powerspikegg/rawdata/public/leagueoflegends_gopb"
)

type mockMatchFetcherServer struct {
	fetcherpb.MatchFetcherServer

	server *grpc.Server

	// matchRequests contains the match request sent by the client
	matchRequests []*fetcherpb.MatchRequest
	// matchRequests contains the summoner request sent by the client
	summonerRequests []*lolpb.Summoner
	// response contains the response to send back to the client
	response *lolpb.MatchReference
	// err contains an eventual error to throw back to the client
	err error
	// address contains the server address
	address string
}

func newMockMatchFetcherServer() (*mockMatchFetcherServer, error) {
	lis, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		return nil, fmt.Errorf("failed to listen: %v", err)
	}
	mock := &mockMatchFetcherServer{
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

// Match is a mock of the match endpoint.
func (s *mockMatchFetcherServer) Match(_ context.Context, req *fetcherpb.MatchRequest) (*lolpb.MatchReference, error) {
	s.matchRequests = append(s.matchRequests, req)
	if s.err != nil {
		return nil, s.err
	}

	return s.response, nil
}

// Resets the mock requests sent list
func (s *mockMatchFetcherServer) reset() {
	s.matchRequests = nil
	s.summonerRequests = nil
}

// UpdateSummoner is a mock of the match endpoint.
func (s *mockMatchFetcherServer) UpdateSummoner(req *lolpb.Summoner, resp fetcherpb.MatchFetcher_UpdateSummonerServer) error {
	s.summonerRequests = append(s.summonerRequests, req)
	if s.err != nil {
		return s.err
	}

	resp.Send(s.response)

	return nil
}

// TestGateway ensures that the gateway is correctly parsing parameters and answering to API requests.
func TestGateway(t *testing.T) {
	tt := []struct {
		name             string
		serverRequest    string
		serverResponse   *lolpb.MatchReference
		expectedResponse string
		expectedStatus   int
	}{
		{
			name:          "summoner query",
			serverRequest: "/api/summoner/Rangork/EUW",
			serverResponse: &lolpb.MatchReference{
				// TODO(archangel): add a test with multiple match references returned for summoner requests.
				Id: 3122561986,
			},
			expectedResponse: "{\"results\": [{\"id\":3.122561986e+09,\"timestamp\":0,\"version\":\"\",\"plateformId\":\"\",\"region\":\"BR\",\"queueType\":\"TEAM_BUILDER_RANKED_SOLO\",\"season\":\"SEASON2017\"}]}",
			expectedStatus:   http.StatusOK,
		},
		{
			name:          "match query",
			serverRequest: "/api/match/3122561986/EUW",
			serverResponse: &lolpb.MatchReference{
				Id: 3122561986,
			},
			expectedResponse: "{\"id\":3.122561986e+09,\"timestamp\":0,\"version\":\"\",\"plateformId\":\"\",\"region\":\"BR\",\"queueType\":\"TEAM_BUILDER_RANKED_SOLO\",\"season\":\"SEASON2017\"}",
			expectedStatus:   http.StatusOK,
		},
	}

	matchFetcherServer, err := newMockMatchFetcherServer()
	if err != nil {
		t.Fatalf("unable to create mock match fetcher server: %v", err)
	}
	defer matchFetcherServer.server.Stop()

	//computationClient := newMockMatchComputationServer() // TODO(archangel): computation tests

	conn, err := grpc.Dial(matchFetcherServer.address, grpc.WithInsecure())
	if err != nil {
		t.Fatalf("unable to connect to the mock match fetcher server: %v", err)
	}
	defer conn.Close()

	matchFetcherClient := fetcherpb.NewMatchFetcherClient(conn)
	//computationClient := computation.NewMatchComputationClient(conn) // TODO(archangel): computation tests

	lis, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		t.Fatalf("failed to listen: %v", err)
	}

	s := createServer(matchFetcherClient, nil)

	go func(s *http.Server, l net.Listener) {
		s.Serve(l)
		fmt.Printf("creating server on: %s", s.Addr)
	}(s.server, lis)

	for _, testValue := range tt {
		matchFetcherServer.reset()
		matchFetcherServer.response = testValue.serverResponse

		req, err := http.NewRequest("GET", s.server.Addr+testValue.serverRequest, nil)
		if err != nil {
			t.Fatal(err)
		}

		rr := httptest.NewRecorder()

		s.server.Handler.ServeHTTP(rr, req)

		// Check the status code is what we expect.
		if status := rr.Code; status != testValue.expectedStatus {
			t.Errorf("handler returned wrong status code: got %v want %v", status, testValue.expectedStatus)
		}

		// Check the response body is what we expect.
		if rr.Body.String() != testValue.expectedResponse {
			t.Errorf("handler returned unexpected body: got %v want %v", rr.Body.String(), testValue.expectedResponse)
		}
	}

}
