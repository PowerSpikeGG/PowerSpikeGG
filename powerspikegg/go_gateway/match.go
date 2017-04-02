package main

import (
	"fmt"
	"github.com/golang/protobuf/jsonpb"
	"golang.org/x/net/context"
	"net/http"
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

func parseMatchRequestParameters(r *http.Request) (int64, lolpb.Region, error) {
	params := strings.Split(r.URL.Path[len("/api/match/"):], "/")
	if len(params) < 2 {
		return 0, 0, fmt.Errorf("not enough parameters")
	}

	matchIDStr := params[0]
	region := params[1]

	var formattedRegion lolpb.Region
	if parsedRegion, ok := lolpb.Region_value[strings.ToUpper(region)]; ok {
		formattedRegion = lolpb.Region(parsedRegion)
	} else {
		return 0, 0, fmt.Errorf("unknown / unsupported region: %v", region)
	}

	matchID, err := strconv.ParseInt(matchIDStr, 10, 64)
	if err != nil {
		return 0, 0, fmt.Errorf("Invalid match ID: %s, %v", matchIDStr, err)
	}

	return matchID, formattedRegion, nil
}

func (gws *gatewayServer) matchHandler(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()

	matchID, formattedRegion, err := parseMatchRequestParameters(r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
	}

	response, err := fetchMatchResults(ctx, gws.matchFetcherClient, matchID, formattedRegion)
	if err != nil {
		http.Error(w, fmt.Sprintf("server raised an error while getting match %d: %v", matchID, err), http.StatusInternalServerError)
		return
	}

	// proto to json
	marshaler := &jsonpb.Marshaler{}
	json, err := marshaler.MarshalToString(response)
	if err != nil {
		http.Error(w, fmt.Sprintf("%s: marshaling error: %v", response, err), http.StatusInternalServerError)
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")

	fmt.Fprintf(w, "%s", json)
}
