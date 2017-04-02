package main

import (
	"fmt"
	"github.com/golang/protobuf/jsonpb"
	"golang.org/x/net/context"
	"net/http"
	lolpb "powerspike.gg/powerspikegg/rawdata/public/leagueoflegends_gopb"
	computation "powerspike.gg/powerspikegg/serving/match_computation_gopb"
	"strconv"
	"strings"
)

func getFeature(ctx context.Context, client computation.MatchComputationClient, summonerID int32, matchID int64, region lolpb.Region) (*computation.MatchComputationFeature, error) {
	request := &computation.MatchComputationRequest{
		ModelName: "Not implemented yet",
		Match: &lolpb.MatchReference{
			Id:     float64(matchID), // TODO(archangel): this cast shouldn't be there as a match shouldn't have a floating ID
			Region: region,
		},
		SummonerId: summonerID,
	}

	response, err := client.GetFeature(ctx, request)
	return response, err
}

func parseComputationRequestParameters(r *http.Request) (int32, int64, lolpb.Region, error) {
	params := strings.Split(r.URL.Path[len("/api/computation/"):], "/")
	if len(params) < 3 {
		return 0, 0, 0, fmt.Errorf("not enough parameters")
	}

	summonerIDStr := params[0]
	matchIDStr := params[1]
	region := params[2]

	var formattedRegion lolpb.Region
	if parsedRegion, ok := lolpb.Region_value[strings.ToUpper(region)]; ok {
		formattedRegion = lolpb.Region(parsedRegion)
	} else {
		return 0, 0, 0, fmt.Errorf("unknown / unsupported region: %v", region)
	}

	matchID, err := strconv.ParseInt(matchIDStr, 10, 64)
	if err != nil {
		return 0, 0, 0, fmt.Errorf("Invalid match ID: %s, %v", matchIDStr, err)
	}

	summonerID, err := strconv.ParseInt(summonerIDStr, 10, 32)
	if err != nil {
		return 0, 0, 0, fmt.Errorf("Invalid summoner ID: %s, %v", summonerIDStr, err)
	}

	return int32(summonerID), matchID, formattedRegion, nil
}

func (gws *gatewayServer) computationHandler(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()

	summonerID, matchID, formattedRegion, err := parseComputationRequestParameters(r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
	}

	response, err := getFeature(ctx, gws.computationClient, summonerID, matchID, formattedRegion)
	if err != nil {
		http.Error(w, fmt.Sprintf("server raised an error while getting computation for summoner %d of match %d: %v", summonerID, matchID, err), http.StatusInternalServerError)
		return
	}

	marshaler := &jsonpb.Marshaler{}
	json, err := marshaler.MarshalToString(response)
	if err != nil {
		http.Error(w, fmt.Sprintf("%s: marshaling error: %v", response, err), http.StatusInternalServerError)
	}

	fmt.Fprintf(w, "%s", json)
}
