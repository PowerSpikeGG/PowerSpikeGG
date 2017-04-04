package main

import (
	"errors"
	"fmt"
	"net/http"
	"strconv"
	"strings"

	"github.com/golang/protobuf/jsonpb"
	"golang.org/x/net/context"

	fetcherpb "powerspike.gg/powerspikegg/rawdata/fetcher/service_gopb"
	lolpb "powerspike.gg/powerspikegg/rawdata/public/leagueoflegends_gopb"
)

func parseAggregationRequestParameters(r *http.Request) (*fetcherpb.Query, error) {
	params := strings.Split(r.URL.Path[len("/api/aggregation/"):], "/")
	if len(params) != 4 {
		return nil, errors.New("not enough parameters")
	}

	leagueStr := params[0]
	championIDStr := params[1]
	summonerIDStr := params[2]
	regionStr := params[3]

	var region lolpb.Region
	if parsedRegion, ok := lolpb.Region_value[strings.ToUpper(regionStr)]; ok {
		region = lolpb.Region(parsedRegion)
	} else {
		return nil, fmt.Errorf("unknown / unsupported region: %v", regionStr)
	}

	var league lolpb.League
	if parsedLeague, ok := lolpb.League_value[strings.ToUpper(leagueStr)]; ok {
		league = lolpb.League(parsedLeague)
	} else {
		return nil, fmt.Errorf("unknown / unsupported league: %v", regionStr)
	}

	championID, err := strconv.ParseInt(championIDStr, 10, 32)
	if err != nil {
		return nil, fmt.Errorf("Invalid champion ID: %s, %v", championIDStr, err)
	}

	summonerID, err := strconv.ParseInt(summonerIDStr, 10, 32)
	if err != nil {
		return nil, fmt.Errorf("Invalid summoner ID: %s, %v", summonerIDStr, err)
	}

	return &fetcherpb.Query{
		League: league,
		Champion: &lolpb.Champion{
			Id: int32(championID),
		},
		Summoner: &lolpb.Summoner{
			Id:     int32(summonerID),
			Region: region,
		},
	}, nil
}

func (gws *gatewayServer) aggregationHandler(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()

	agr, err := parseAggregationRequestParameters(r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response, err := gws.matchFetcherClient.AverageStatistics(ctx, agr)
	if err != nil {
		http.Error(
			w,
			fmt.Sprintf(
				"server raised an error while aggregating for summoner %d of league %s for champion %d: %v",
				agr.Summoner.Id, agr.League, agr.Champion.Id, err),
			http.StatusInternalServerError)
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
