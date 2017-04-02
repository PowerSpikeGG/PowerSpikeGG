package main

import (
	"fmt"
	"google.golang.org/grpc"
	"net/http"
	"os"

	"net"
	fetcherpb "powerspike.gg/powerspikegg/rawdata/fetcher/service_gopb"
	computation "powerspike.gg/powerspikegg/serving/match_computation_gopb"
)

type gatewayServer struct {
	matchFetcherClient fetcherpb.MatchFetcherClient
	computationClient  computation.MatchComputationClient
	server             *http.Server
}

func createServer(matchFetcherClient fetcherpb.MatchFetcherClient, computationClient computation.MatchComputationClient) *gatewayServer {
	mux := http.NewServeMux()

	s := &http.Server{
		Handler: mux,
	}

	gs := &gatewayServer{
		server:             s,
		matchFetcherClient: matchFetcherClient,
		computationClient:  computationClient,
	}

	// /api/summoner/{summonerName}/{region}
	mux.HandleFunc("/api/summoner/", gs.summonerHandler)
	// /api/match/{matchID}/{region}
	mux.HandleFunc("/api/match/", gs.matchHandler)
	// /api/computation/{matchID}/{summonerID}/{region}
	mux.HandleFunc("/api/computation/", gs.computationHandler)

	return gs
}

func main() {
	conn, err := grpc.Dial("localhost:50001", grpc.WithInsecure())
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
	}
	defer conn.Close()

	matchFetcherClient := fetcherpb.NewMatchFetcherClient(conn)
	computationClient := computation.NewMatchComputationClient(conn)

	lis, err := net.Listen("tcp", "127.0.0.1:8080")
	if err != nil {
		fmt.Fprintf(os.Stderr, "failed to listen: %v", err)
		os.Exit(1)
	}

	gws := createServer(matchFetcherClient, computationClient)
	gws.server.Serve(lis)
}
