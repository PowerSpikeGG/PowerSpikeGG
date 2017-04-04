package main

import (
	"fmt"
	"net/http"
	"strconv"
	"strings"

	"github.com/golang/protobuf/jsonpb"
	"golang.org/x/net/context"

	"errors"
	fetcherpb "powerspike.gg/powerspikegg/rawdata/fetcher/service_gopb"
	lolpb "powerspike.gg/powerspikegg/rawdata/public/leagueoflegends_gopb"
)

func parseMatchRequestParameters(r *http.Request) (*fetcherpb.MatchRequest, error) {
	params := strings.Split(r.URL.Path[len("/api/match/"):], "/")
	if len(params) != 2 {
		return nil, errors.New("not enough parameters")
	}

	matchIDStr := params[0]
	regionStr := params[1]

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

	return &fetcherpb.MatchRequest{
		Id:     matchID,
		Region: region,
	}, nil
}

func (gws *gatewayServer) matchHandler(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()

	match, err := parseMatchRequestParameters(r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response, err := gws.matchFetcherClient.Match(ctx, match)
	if err != nil {
		http.Error(w, fmt.Sprintf("server raised an error while getting match %d: %v", match.Id, err), http.StatusInternalServerError)
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

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, "%s", json)
}
