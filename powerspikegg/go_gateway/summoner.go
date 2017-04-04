package main

import (
	"errors"
	"fmt"
	"io"
	"net/http"
	"strings"

	"github.com/golang/protobuf/jsonpb"
	"golang.org/x/net/context"

	lolpb "powerspike.gg/powerspikegg/rawdata/public/leagueoflegends_gopb"
)

func parseSummonerRequestParameters(r *http.Request) (*lolpb.Summoner, error) {
	params := strings.Split(r.URL.Path[len("/api/summoner/"):], "/")
	if len(params) != 2 {
		return nil, errors.New("not enough parameters")
	}

	summonerName := params[0]
	regionStr := params[1]

	var region lolpb.Region
	if parsedRegion, ok := lolpb.Region_value[strings.ToUpper(regionStr)]; ok {
		region = lolpb.Region(parsedRegion)
	} else {
		return nil, fmt.Errorf("unknown / unsupported region: %v", regionStr)
	}

	return &lolpb.Summoner{
		Name:   summonerName,
		Region: region,
	}, nil
}

func (gws *gatewayServer) summonerHandler(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()

	summoner, err := parseSummonerRequestParameters(r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response, err := gws.matchFetcherClient.UpdateSummoner(ctx, summoner)
	if err != nil {
		http.Error(w, fmt.Sprintf("server raised an error while fetching match of summoner %s: %v", summoner.Name, err), http.StatusInternalServerError)
		return
	}

	var summonerMatches []string
	for {
		match, err := response.Recv()
		if err != nil { // End of match stream.
			if err != io.EOF {
				http.Error(w, fmt.Sprintf("server raised an error while receiving a match from the grpc stream for summoner %s: %v", summoner.Name, err), http.StatusInternalServerError)
				return
			}
			break
		}

		marshaler := &jsonpb.Marshaler{
			EmitDefaults: true,
		}
		json, err := marshaler.MarshalToString(match)
		if err != nil {
			http.Error(w, fmt.Sprintf("%s: marshaling error: %v", match, err), http.StatusInternalServerError)
			return
		}

		summonerMatches = append(summonerMatches, json)
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, "{\"results\": [%s]}", strings.Join(summonerMatches[:], ","))
}
