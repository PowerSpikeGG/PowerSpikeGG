package main

import (
	"flag"
	"fmt"
	"net"
	"net/http"
	"os"

	"google.golang.org/grpc"

	fetcherpb "powerspike.gg/powerspikegg/rawdata/fetcher/service_gopb"
	computationpb "powerspike.gg/powerspikegg/serving/match_computation_gopb"
)

var (
	grpcServerAddress = flag.String("grpc-server-address", "127.0.0.1:50001", "Address of the GRPC server")
	httpAddress       = flag.String("http-address", "127.0.0.1", "Address of the HTTP gateway")
	httpPort          = flag.String("http-port", "8080", "Port of the HTTP gateway")
)

type gatewayServer struct {
	matchFetcherClient fetcherpb.MatchFetcherClient
	computationClient  computationpb.MatchComputationClient
	server             *http.Server
}

func createServer(matchFetcherClient fetcherpb.MatchFetcherClient, computationClient computationpb.MatchComputationClient) *gatewayServer {
	mux := http.NewServeMux()

	gs := &gatewayServer{
		server: &http.Server{
			Handler: mux,
		},
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
	flag.Parse()

	conn, err := grpc.Dial(*grpcServerAddress, grpc.WithInsecure())
	if err != nil {
		fmt.Fprintln(os.Stderr, fmt.Sprintf("unable to reach fetcher server: %v", err))
	}
	defer conn.Close()

	matchFetcherClient := fetcherpb.NewMatchFetcherClient(conn)
	computationClient := computationpb.NewMatchComputationClient(conn)

	lis, err := net.Listen("tcp", *httpAddress+":"+*httpPort)
	if err != nil {
		fmt.Fprintf(os.Stderr, "failed to listen: %v", err)
		os.Exit(1)
	}

	gws := createServer(matchFetcherClient, computationClient)
	gws.server.Serve(lis)
}
