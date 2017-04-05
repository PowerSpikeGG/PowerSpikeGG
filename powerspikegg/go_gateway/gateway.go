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
	grpcFetcherURL     = flag.String("grpc_fetcher_url", "127.0.0.1:50001", "URL of the GRPC server of the fetcher service")
	grpcComputationURL = flag.String("grpc_computation_url", "127.0.0.1:50051", "URL of the GRPC server of the computation service")
	httpAddress        = flag.String("http_address", "127.0.0.1", "Address of the HTTP gateway")
	httpPort           = flag.String("http_port", "8080", "Port of the HTTP gateway")
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
	// /api/computation/{summonerID}/{matchID}/{region}
	mux.HandleFunc("/api/computation/", gs.computationHandler)
	// /api/aggregation/{league}/{championID}/{summonerID}/{region}
	mux.HandleFunc("/api/aggregation/", gs.aggregationHandler)

	return gs
}

func main() {
	flag.Parse()

	connFetcher, err := grpc.Dial(*grpcFetcherURL, grpc.WithInsecure())
	if err != nil {
		fmt.Fprintln(os.Stderr, fmt.Sprintf("unable to reach fetcher gRPC server: %v", err))
	}
	defer connFetcher.Close()
	connComputation, err := grpc.Dial(*grpcComputationURL, grpc.WithInsecure())
	if err != nil {
		fmt.Fprintln(os.Stderr, fmt.Sprintf("unable to reach computation gRPC server: %v", err))
	}
	defer connComputation.Close()

	matchFetcherClient := fetcherpb.NewMatchFetcherClient(connFetcher)
	computationClient := computationpb.NewMatchComputationClient(connComputation)

	lis, err := net.Listen("tcp", *httpAddress+":"+*httpPort)
	if err != nil {
		fmt.Fprintf(os.Stderr, "failed to listen: %v", err)
		os.Exit(1)
	}

	gws := createServer(matchFetcherClient, computationClient)
	gws.server.Serve(lis)
}
