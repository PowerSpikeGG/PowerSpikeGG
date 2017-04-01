package main

import (
	"fmt"
	"google.golang.org/grpc"
	"net/http"
	"os"

	fetcherpb "powerspike.gg/powerspikegg/rawdata/fetcher/service_gopb"
)

var (
	client fetcherpb.MatchFetcherClient
)

func main() {
	conn, err := grpc.Dial("localhost:50001", grpc.WithInsecure())
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
	}
	defer conn.Close()

	client = fetcherpb.NewMatchFetcherClient(conn)

	http.HandleFunc("/api/summoner/", summonerHandler)
	http.HandleFunc("/api/match/", matchHandler)
	http.ListenAndServe(":8080", nil)
}
