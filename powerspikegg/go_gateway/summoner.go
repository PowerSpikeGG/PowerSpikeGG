package main

import (
	"context"
	"fmt"
	"io"
	"net/http"

	"github.com/golang/protobuf/jsonpb"
	fetcherpb "powerspike.gg/powerspikegg/rawdata/fetcher/service_gopb"
	lolpb "powerspike.gg/powerspikegg/rawdata/public/leagueoflegends_gopb"
	"strings"
)

func fetchSummonerMatchResults(ctx context.Context, client fetcherpb.MatchFetcherClient, summonerName string, region lolpb.Region) (fetcherpb.MatchFetcher_UpdateSummonerClient, error) {
	summoner := &lolpb.Summoner{
		Name:   summonerName,
		Region: region,
	}

	response, err := client.UpdateSummoner(ctx, summoner)
	if err != nil {
		return nil, fmt.Errorf("server raised an error while updating summoner %s: %v", summoner.Name, err)
	}

	return response, nil
}

func summonerHandler(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()

	params := strings.Split(r.URL.Path[len("/api/summoner/"):], "/")
	if len(params) < 2 {
		http.Error(w, "not enough parameters", http.StatusBadRequest)
		return
	}

	summonerName := params[0]
	region := params[1]

	var formattedRegion lolpb.Region
	if parsedRegion, ok := lolpb.Region_value[strings.ToUpper(region)]; ok {
		formattedRegion = lolpb.Region(parsedRegion)
	} else {
		http.Error(w, fmt.Sprintf("unknown / unsupported region: %v", region), http.StatusBadRequest)
		return
	}

	response, err := fetchSummonerMatchResults(ctx, client, summonerName, formattedRegion)
	if err != nil {
		http.Error(w, fmt.Sprintf("server raised an error while fetching match of summoner %s: %v", summonerName, err), http.StatusInternalServerError)
		return
	}

	var summonerMatches []string

	for {
		match, err := response.Recv()
		if err != nil {
			// End of match stream.
			if err != io.EOF {
				http.Error(w, fmt.Sprintf("server raised an error while receiving a match from the grpc stream for summoner %s: %v", summonerName, err), http.StatusInternalServerError)
				return
			}
			break
		}

		marshaler := jsonpb.Marshaler{}
		json, err := marshaler.MarshalToString(match)
		if err != nil {
			http.Error(w, fmt.Sprintf("%s: marshaling error: %v", match, err), http.StatusInternalServerError)
		}

		summonerMatches = append(summonerMatches, json)
	}

	fmt.Fprintf(w, "{result: [%s]}", strings.Join(summonerMatches[:], ","))
}
