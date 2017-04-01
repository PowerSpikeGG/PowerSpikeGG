package main

import (
	"context"
	"fmt"
	"github.com/golang/protobuf/jsonpb"
	"net/http"
	"os"
	fetcherpb "powerspike.gg/powerspikegg/rawdata/fetcher/service_gopb"
	lolpb "powerspike.gg/powerspikegg/rawdata/public/leagueoflegends_gopb"
	"strconv"
	"strings"
)

func fetchMatchResults(ctx context.Context, client fetcherpb.MatchFetcherClient, matchID int64, region lolpb.Region) (*lolpb.MatchReference, error) {
	request := &fetcherpb.MatchRequest{
		Id:     matchID,
		Region: region,
	}
	response, err := client.Match(ctx, request)
	return response, err
}

func matchHandler(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()

	params := strings.Split(r.URL.Path[len("/api/match/"):], "/")
	if len(params) < 2 {
		http.Error(w, "not enough parameters", http.StatusBadRequest)
		return
	}
	matchIDStr := params[0]
	region := params[1]

	var formattedRegion lolpb.Region
	if parsedRegion, ok := lolpb.Region_value[strings.ToUpper(region)]; ok {
		formattedRegion = lolpb.Region(parsedRegion)
	} else {
		http.Error(w, fmt.Sprintf("unknown / unsupported region: %v", region), http.StatusBadRequest)
		return
	}

	matchID, err := strconv.ParseInt(matchIDStr, 10, 64)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Invalid match ID: %s, %v", matchIDStr, err)
		return
	}

	response, err := fetchMatchResults(ctx, client, matchID, formattedRegion)
	if err != nil {
		fmt.Fprintf(os.Stderr, "server raised an error while getting match %d: %v", matchID, err)
		return
	}

	marshaler := jsonpb.Marshaler{}
	json, err := marshaler.MarshalToString(response)
	if err != nil {
		http.Error(w, fmt.Sprintf("%s: marshaling error: %v", response, err), http.StatusInternalServerError)
	}

	fmt.Fprintf(w, "%s", json)
}
