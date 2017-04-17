package main

import (
	"bytes"
	"context"
	"errors"
	"flag"
	"fmt"
	"io/ioutil"
	"net"
	"os"
	"testing"

	"github.com/golang/protobuf/proto"
	"github.com/google/subcommands"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"

	fetcherpb "powerspike.gg/powerspikegg/rawdata/fetcher/service_gopb"
	lolpb "powerspike.gg/powerspikegg/rawdata/public/leagueoflegends_gopb"
)

// TestQueryMessageConversion ensures query message is correctly converted from flags.
func TestQueryMessageConversion(t *testing.T) {
	tests := []struct {
		name          string
		command       *cacheToCSVCommand
		hasError      bool
		expectedQuery *fetcherpb.Query
	}{
		{
			name:          "empty query message (wildcard selection)",
			command:       &cacheToCSVCommand{},
			expectedQuery: &fetcherpb.Query{},
		},
		{
			name: "entry with bronze league flag",
			command: &cacheToCSVCommand{
				leagueFlag: "bronze",
			},
			expectedQuery: &fetcherpb.Query{
				League: lolpb.League_BRONZE,
			},
		},
		{
			name: "entry with silver league flag",
			command: &cacheToCSVCommand{
				leagueFlag: "silver",
			},
			expectedQuery: &fetcherpb.Query{
				League: lolpb.League_SILVER,
			},
		},
		{
			name: "entry with capitalized silver league flag",
			command: &cacheToCSVCommand{
				leagueFlag: "Silver",
			},
			expectedQuery: &fetcherpb.Query{
				League: lolpb.League_SILVER,
			},
		},
		{
			name: "entry with invalid league flag",
			command: &cacheToCSVCommand{
				leagueFlag: "foobar",
			},
			hasError: true,
		},
		{
			name: "entry with champion id 111",
			command: &cacheToCSVCommand{
				championFlag: 111,
			},
			expectedQuery: &fetcherpb.Query{
				Champion: &lolpb.Champion{
					Id: 111,
				},
			},
		},
		{
			name: "entry with champion id 222",
			command: &cacheToCSVCommand{
				championFlag: 222,
			},
			expectedQuery: &fetcherpb.Query{
				Champion: &lolpb.Champion{
					Id: 222,
				},
			},
		},
		{
			name: "entry with a summoner name foobar",
			command: &cacheToCSVCommand{
				summonerNameFlag: "foobar",
			},
			expectedQuery: &fetcherpb.Query{
				Summoner: &lolpb.Summoner{
					Name: "foobar",
				},
			},
		},
		{
			name: "entry with a summoner name Foo Bar",
			command: &cacheToCSVCommand{
				summonerNameFlag: "Foo Bar",
			},
			expectedQuery: &fetcherpb.Query{
				Summoner: &lolpb.Summoner{
					Name: "Foo Bar",
				},
			},
		},
		{
			name: "composed entry with league and champion",
			command: &cacheToCSVCommand{
				leagueFlag:   "bronze",
				championFlag: 111,
			},
			expectedQuery: &fetcherpb.Query{
				League:   lolpb.League_BRONZE,
				Champion: &lolpb.Champion{Id: 111},
			},
		},
	}

	for _, tt := range tests {
		actualQuery, err := tt.command.convertFlagsToQuery()

		if err != nil {
			if !tt.hasError {
				t.Errorf("unexpected error returned: %q", err)
			}
			continue
		}

		if !proto.Equal(actualQuery, tt.expectedQuery) {
			t.Errorf(
				"expected query does not match actual query.\nExpected %v\nActual: %v",
				proto.MarshalTextString(tt.expectedQuery),
				proto.MarshalTextString(actualQuery),
			)
		}
	}
}

// TestFlagAssignation ensures flags are correctly assigned.
func TestFlagAssignation(t *testing.T) {
	tests := []struct {
		name            string
		args            []string
		hasError        bool
		expectedCommand *cacheToCSVCommand
	}{
		{
			name:            "ensure default values are correct",
			args:            []string{},
			expectedCommand: &cacheToCSVCommand{},
		},
		{
			name: "ensure flag values are correctly assigned",
			args: []string{
				"-league=bronze",
				"-champion=111",
				"-summoner=foobar",
			},
			expectedCommand: &cacheToCSVCommand{
				leagueFlag:       "bronze",
				championFlag:     111,
				summonerNameFlag: "foobar",
			},
		},
		{
			name:     "ensure flag parsing raise error on invalid champion flag",
			args:     []string{"-champion=abc"},
			hasError: true,
		},
	}

	for _, tt := range tests {
		flagSet := flag.NewFlagSet(tt.name, flag.ContinueOnError)
		command := &cacheToCSVCommand{}
		command.SetFlags(flagSet)

		if err := flagSet.Parse(tt.args); err != nil {
			if !tt.hasError {
				t.Errorf("unexpected error while parsing flags: %v", err)
			}
			continue
		}

		if command.leagueFlag != tt.expectedCommand.leagueFlag {
			t.Errorf(
				"unexpected value for flag league:\nExpected: %v\nActual: %v",
				tt.expectedCommand.leagueFlag, command.leagueFlag,
			)
		}
	}
}

var matchSample = &lolpb.MatchReference{
	Detail: &lolpb.MatchDetail{
		Duration: 39,
		Teams: []*lolpb.TeamDetail{
			{
				Winner: true,
				Participants: []*lolpb.Participant{
					{
						Statistics: &lolpb.PlayerStatistics{
							Kills:         1,
							Deaths:        2,
							Assists:       3,
							ChampionLevel: 4,
							MagicDamages: &lolpb.DamageStatistic{
								Total:       5,
								ToChampions: 6,
								Taken:       7,
							},
							PhysicalDamages: &lolpb.DamageStatistic{
								Total:       8,
								ToChampions: 9,
								Taken:       10,
							},
							TrueDamages: &lolpb.DamageStatistic{
								Total:       11,
								ToChampions: 12,
								Taken:       13,
							},
							TotalDamages: &lolpb.DamageStatistic{
								Total:       14,
								ToChampions: 15,
								Taken:       16,
							},
							TotalHeal:                        17,
							LargestCriticalStrike:            18,
							GoldEarned:                       19,
							MinionsKilled:                    20,
							NeutralMinionsKilled:             21,
							NeutralMinionsKilledEnnemyJungle: 22,
							NeutralMinionsKilledTeamJungle:   23,
							SightWardsBought:                 24,
							WardsPlaced:                      25,
							WardsKilled:                      26,
							DoubleKills:                      27,
							TripleKills:                      28,
							QuadraKills:                      29,
							PentaKills:                       30,
							KillingSprees:                    31,
							LargestKillingSpree:              32,
							LargestMultiKill:                 33,
							InhibitorKills:                   34,
							TowerKills:                       35,
							FirstBloodAssist:                 true,
							FirstBloodKill:                   true,
							FirstInhibitorKill:               true,
							FirstTowerAssist:                 true,
							FirstTowerKill:                   true,
							TotalCrowdControl:                36,
							TotalUnitsHealed:                 37,
						},
						Champion: &lolpb.Champion{
							Id: 38,
						},
						Summoner: &lolpb.Summoner{
							League: lolpb.League_BRONZE,
						},
					},
				},
			},
		},
	},
}

// TestConversionToStatsArray ensures the conversion from match proto to stringified arrray is correctly done.
func TestConverrsionToStatsArray(t *testing.T) {
	team := matchSample.Detail.Teams[0]
	participant := team.Participants[0]

	command := &cacheToCSVCommand{}
	result, err := command.toStatsArray(participant, team, matchSample)
	if err != nil {
		t.Errorf("non null error while converting participant: %v", err)
	}

	// ensure result is a non null list of string
	if len(result) < 1 {
		t.Fatalf("CSV conversion returned an empty slice")
	}
	for i, value := range result {
		if value == "" {
			t.Errorf("null value in the result detected at index %d", i)
		}
	}
}

// cacheMockResponse is the responses returned by the server when we query the CacheQuery endpoint.
type cacheMockResponse struct {
	match *lolpb.MatchReference
	err   error
}

// mockCacheQueryServer is a fake implementation of the gRPC endpoint CacheQuery.
type mockCacheQueryServer struct {
	fetcherpb.MatchFetcherServer

	server *grpc.Server

	// request contains the request sent by the client
	request *fetcherpb.Query
	// responses contains the responses to send to the client
	responses []*cacheMockResponse
	// address contains the server address
	address string
}

// newMockCacheQueryServer creates a new gRPC server.
func newMockCacheQueryServer() (*mockCacheQueryServer, error) {
	lis, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		return nil, fmt.Errorf("failed to listen: %v", err)
	}
	mock := &mockCacheQueryServer{
		address: lis.Addr().String(),
		server:  grpc.NewServer(),
	}
	fetcherpb.RegisterMatchFetcherServer(mock.server, mock)
	reflection.Register(mock.server)

	go func(s *grpc.Server, l net.Listener) {
		s.Serve(l)
	}(mock.server, lis)
	return mock, nil
}

// Mock the CacheQuery endpoint
func (s *mockCacheQueryServer) CacheQuery(req *fetcherpb.Query, stream fetcherpb.MatchFetcher_CacheQueryServer) error {
	s.request = req

	for _, response := range s.responses {
		if response.err != nil {
			return response.err
		}
		stream.Send(response.match)
	}
	return nil
}

// prepare resets the server and prepares the server response.
func (s *mockCacheQueryServer) prepare(reqs []*cacheMockResponse) {
	s.request = nil
	s.responses = reqs
}

// TestServerQuery tests the integration with the gRPC server.
func TestServerQuery(t *testing.T) {
	tests := []struct {
		name           string
		query          *fetcherpb.Query
		expectError    bool
		serverResponse []*cacheMockResponse
	}{
		{
			name:           "empty match return",
			query:          &fetcherpb.Query{},
			serverResponse: []*cacheMockResponse{},
		},
		{
			name:  "single match return",
			query: &fetcherpb.Query{},
			serverResponse: []*cacheMockResponse{
				{match: matchSample},
			},
		},
		{
			name:  "multiple match return",
			query: &fetcherpb.Query{},
			serverResponse: []*cacheMockResponse{
				{match: matchSample},
				{match: matchSample},
			},
		},
		{
			name:        "error on before first match",
			query:       &fetcherpb.Query{},
			expectError: true,
			serverResponse: []*cacheMockResponse{
				{err: errors.New("foobar error")},
			},
		},
		{
			name:        "error during the stream",
			query:       &fetcherpb.Query{},
			expectError: true,
			serverResponse: []*cacheMockResponse{
				{match: matchSample},
				{err: errors.New("foobar error")},
			},
		},
		{
			name:  "special query",
			query: &fetcherpb.Query{League: lolpb.League_BRONZE},
			serverResponse: []*cacheMockResponse{
				{match: matchSample},
			},
		},
		{
			name:        "invalid match (conversion failure)",
			query:       &fetcherpb.Query{},
			expectError: true,
			serverResponse: []*cacheMockResponse{
				{match: &lolpb.MatchReference{}},
			},
		},
	}

	server, err := newMockCacheQueryServer()
	if err != nil {
		t.Fatalf("unable to create test server: %v", err)
	}
	defer server.server.Stop()

	conn, err := grpc.Dial(server.address, grpc.WithInsecure())
	if err != nil {
		t.Fatalf("unable to create a client to the test server: %v", err)
	}
	defer conn.Close()

	// Inject the stub into the command.
	command := &cacheToCSVCommand{
		base: base{connection: conn},
	}

	for _, tt := range tests {
		server.prepare(tt.serverResponse)

		buffer := bytes.NewBuffer([]byte{})
		if err := command.fetchAndConvertMatches(context.Background(), tt.query, buffer); err != nil {
			if !tt.expectError {
				t.Errorf("unexpected error in test %q: %v", tt.name, err)
			}
			continue
		}

		if !proto.Equal(server.request, tt.query) {
			t.Fatalf(
				"server sent an invalid query in test %q. \nExpected: %s\nActual: %s",
				tt.name, proto.MarshalTextString(tt.query), proto.MarshalTextString(server.request),
			)
		}

		var results []string
		for {
			result, err := buffer.ReadBytes('\n')
			if err != nil {
				break
			}
			results = append(results, string(result))
		}
		if len(results) > len(tt.serverResponse) {
			t.Fatalf(
				"result length is too long (expected %d < %d)",
				len(results), len(tt.serverResponse),
			)
		}
		for index := range results {
			entry := tt.serverResponse[index]
			if entry.err != nil {
				t.Fatalf("result was an error but has been converted as a match")
			}
		}
	}
}

// TestCacheToCSVCommand is a test of the whole subcommand using a mocked server.
func TestCacheToCSVCommand(t *testing.T) {
	tests := []struct {
		name            string
		args            []string
		expectedStatus  subcommands.ExitStatus
		serverResponses []*cacheMockResponse
	}{
		{
			name:           "non filtered query",
			args:           []string{},
			expectedStatus: subcommands.ExitSuccess,
			serverResponses: []*cacheMockResponse{
				{match: matchSample},
			},
		},
		{
			name:           "non filtered query with server error",
			args:           []string{},
			expectedStatus: subcommands.ExitFailure,
			serverResponses: []*cacheMockResponse{
				{err: errors.New("foobar error")},
			},
		},
		{
			name:           "filtered query",
			args:           []string{"-league=bronze"},
			expectedStatus: subcommands.ExitSuccess,
			serverResponses: []*cacheMockResponse{
				{match: matchSample},
			},
		},
		{
			name:           "filtered query with server error",
			args:           []string{"-league=bronze"},
			expectedStatus: subcommands.ExitFailure,
			serverResponses: []*cacheMockResponse{
				{err: errors.New("foobar error")},
			},
		},
		{
			name:            "invalid filter parameters (bad league)",
			args:            []string{"-league=boo-boo-invalid"},
			expectedStatus:  subcommands.ExitUsageError,
			serverResponses: nil,
		},
	}

	server, err := newMockCacheQueryServer()
	if err != nil {
		t.Fatalf("unable to create test server: %v", err)
	}
	defer server.server.Stop()

	conn, err := grpc.Dial(server.address, grpc.WithInsecure())
	if err != nil {
		t.Fatalf("unable to create a client to the test server: %v", err)
	}
	defer conn.Close()

	for _, tt := range tests {
		server.prepare(tt.serverResponses)

		flagSet := flag.NewFlagSet(tt.name, flag.ContinueOnError)
		command := &cacheToCSVCommand{base: base{connection: conn}}
		command.SetFlags(flagSet)
		if err := flagSet.Parse(tt.args); err != nil {
			t.Fatalf("unable to parse given flags in test %q: %v", tt.name, err)
		}

		exitStatus := command.Execute(context.Background(), flagSet)
		if exitStatus != tt.expectedStatus {
			t.Errorf("unexpected status in test %q: %s != %s", tt.name, exitStatus, tt.expectedStatus)
		}
	}
}

// TestCacheToCSVOutputToFile checks if file IO are correctly handled in the command.
func TestCacheToCSVOutputToFile(t *testing.T) {
	server, err := newMockCacheQueryServer()
	if err != nil {
		t.Fatalf("unable to create test server: %v", err)
	}
	defer server.server.Stop()

	// We just need to inject a sample match to get something to write in the file
	server.prepare([]*cacheMockResponse{{match: matchSample}})

	conn, err := grpc.Dial(server.address, grpc.WithInsecure())
	if err != nil {
		t.Fatalf("unable to create a client to the test server: %v", err)
	}
	defer conn.Close()

	// Test a valid output file
	// NOTE: this might create a race condition if the file is generated
	// by something else between the time it is removed from the test and
	// created by the command. However we can safely assume this case has
	// small chances to occurs.
	tempFile, err := ioutil.TempFile("", "tmp")
	if err != nil {
		t.Fatalf("unable to create a temporary file: %v", err)
	}
	if err := os.Remove(tempFile.Name()); err != nil {
		t.Fatalf("unable to remove the generated temporary file: %v", err)
	}
	// ensure file is removed at the end of the test since the command may
	// generate a new file.
	defer os.Remove(tempFile.Name())

	flagSet := flag.NewFlagSet("valid output file", flag.ContinueOnError)
	command := &cacheToCSVCommand{base: base{connection: conn}}
	command.SetFlags(flagSet)
	if err := flagSet.Parse([]string{"-output=" + tempFile.Name()}); err != nil {
		t.Fatalf("unable to parse given flags: %v", err)
	}

	if exitStatus := command.Execute(context.Background(), flagSet); exitStatus != subcommands.ExitSuccess {
		t.Fatalf("unexpected failure of test with valid file")
	}
	content, err := ioutil.ReadFile(tempFile.Name())
	if err != nil {
		t.Fatalf("unable to open generated file: %v", err)
	}
}
