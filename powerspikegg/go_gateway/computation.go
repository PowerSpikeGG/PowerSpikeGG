package main

import (
	"errors"
	"fmt"
	"net/http"
	"strconv"
	"strings"

	"github.com/golang/protobuf/jsonpb"
	"golang.org/x/net/context"

	lolpb "powerspike.gg/powerspikegg/rawdata/public/leagueoflegends_gopb"
	computationpb "powerspike.gg/powerspikegg/serving/match_computation_gopb"
)

func parseComputationRequestParameters(r *http.Request) (*computationpb.MatchComputationRequest, error) {
	params := strings.Split(r.URL.Path[len("/api/computation/"):], "/")
	if len(params) != 3 {
		return nil, errors.New("not enough parameters")
	}

	summonerIDStr := params[0]
	matchIDStr := params[1]
	regionStr := params[2]

	var region lolpb.Region
	if parsedRegion, ok := lolpb.Region_value[strings.ToUpper(regionStr)]; ok {
		region = lolpb.Region(parsedRegion)
	} else {
		return nil, fmt.Errorf("unknown / unsupported region: %v", regionStr)
	}

	matchID, err := strconv.ParseInt(matchIDStr, 10, 64)
	if err != nil {
		return nil, fmt.Errorf("Invalid match ID: %s, %v", matchIDStr, err)
	}

	summonerID, err := strconv.ParseInt(summonerIDStr, 10, 32)
	if err != nil {
		return nil, fmt.Errorf("Invalid summoner ID: %s, %v", summonerIDStr, err)
	}

	return &computationpb.MatchComputationRequest{
		ModelName: "Not implemented yet",
		Match: &lolpb.MatchReference{
			Id:     float64(matchID), // TODO(archangel): this cast shouldn't be there as a match shouldn't have a floating ID
			Region: region,
		},
		SummonerId: int32(summonerID),
	}, nil
}

func (gws *gatewayServer) computationHandler(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()

	mcr, err := parseComputationRequestParameters(r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response, err := gws.computationClient.GetFeature(ctx, mcr)
	if err != nil {
		http.Error(w, fmt.Sprintf("server raised an error while getting computation for summoner %d of match %f: %v", mcr.SummonerId, mcr.Match.Id, err), http.StatusInternalServerError)
		return
	}

	marshaler := &jsonpb.Marshaler{
		EmitDefaults: true,
	}
	json, err := marshaler.MarshalToString(response)
	if err != nil {
		http.Error(w, fmt.Sprintf("%s: marshaling error: %v", response, err), http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, "%s", json)
}
