package main

import (
	"context"
	"fmt"
	"io"
	"net/http"
	"strings"

	fetcherpb "powerspike.gg/powerspikegg/rawdata/fetcher/service_gopb"
	lolpb "powerspike.gg/powerspikegg/rawdata/public/leagueoflegends_gopb"
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

func parseSummonerRequestParameters(w http.ResponseWriter, r *http.Request) (string, lolpb.Region, error) {
	params := strings.Split(r.URL.Path[len("/api/summoner/"):], "/")
	if len(params) < 2 {
		return "", 0, fmt.Errorf("not enough parameters")
	}

	summonerName := params[0]
	region := params[1]

	var formattedRegion lolpb.Region
	if parsedRegion, ok := lolpb.Region_value[strings.ToUpper(region)]; ok {
		formattedRegion = lolpb.Region(parsedRegion)
	} else {
		return "", 0, fmt.Errorf("unknown / unsupported region: %v", region)
	}

	return summonerName, formattedRegion, nil
}

func summonerHandler(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()

	summonerName, formattedRegion, err := parseSummonerRequestParameters(w, r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
	}

	response, err := fetchSummonerMatchResults(ctx, client, summonerName, formattedRegion)
	if err != nil {
		http.Error(w, fmt.Sprintf("server raised an error while fetching match of summoner %s: %v", summonerName, err), http.StatusInternalServerError)
		return
	}

	var summonerMatches []string

	for {
		// for all summoner match in stream
		match, err := response.Recv()
		if err != nil {
			// End of match stream.
			if err != io.EOF {
				http.Error(w, fmt.Sprintf("server raised an error while receiving a match from the grpc stream for summoner %s: %v", summonerName, err), http.StatusInternalServerError)
				return
			}
			break
		}

		// proto to json
		json, err := marshaler.MarshalToString(match)
		if err != nil {
			http.Error(w, fmt.Sprintf("%s: marshaling error: %v", match, err), http.StatusInternalServerError)
		}

		summonerMatches = append(summonerMatches, json)
	}

	fmt.Fprintf(w, "{result: [%s]}", strings.Join(summonerMatches[:], ","))
}
