package main

import (
	"flag"
	"io"
	"os"
	"strings"

	"github.com/op/go-logging"
	"golang.org/x/net/context"
	"google.golang.org/grpc"

	fetcherpb "powerspike.gg/powerspikegg/rawdata/fetcher/service_gopb"
	lolpb "powerspike.gg/powerspikegg/rawdata/public/leagueoflegends_gopb"
)

const (
	defaultRegion = lolpb.Region_EUW
	logLevel      = logging.INFO
)

var (
	region lolpb.Region
	client fetcherpb.MatchFetcherClient
	log    = logging.MustGetLogger("populator")
)

// getConnectedSummoners feed the summonersChan with the summoners that played
// played with the summoner given as parameter.
func getConnectedSummoners(summoner string, summonersChan chan string) {
	request := &lolpb.Summoner{
		Name:   summoner,
		Region: region,
	}

	response, err := client.UpdateSummoner(context.Background(), request)
	if err != nil {
		log.Errorf("Unable to fetch summoner '%s' information: %q", summoner, err)
		return
	}

	for {
		match, err := response.Recv()
		if err == io.EOF {
			return
		}
		if err != nil {
			log.Errorf("Error while fetching summoner '%s' matches: %q", summoner, err)
			return
		}
		log.Debugf("Got match ID %d", match.Id)

		// Feed the channel with the summoners in the match.
		for _, team := range match.Detail.Teams {
			for _, participant := range team.Participants {
				summonersChan <- participant.Summoner.Name
				log.Debugf("Summoner %s played match %d with %s", summoner, match.Id, participant.Summoner.Name)
			}
		}
	}
}

// populateCache will prepare a huge amount of UpdateSummoner request against
// a fetcher service, to force him to feed its cache database.
func populateCache(conn *grpc.ClientConn) {
	knownSummoners := make(map[string]bool)
	summonersChan := make(chan string)

	for _, summoner := range flag.Args() {
		knownSummoners[summoner] = true
		go getConnectedSummoners(summoner, summonersChan)
	}

	// Since the chan is never closed, this is the equivalent of an infinite
	// loop.
	for summoner := range summonersChan {
		if _, ok := knownSummoners[summoner]; !ok {
			knownSummoners[summoner] = true
			go getConnectedSummoners(summoner, summonersChan)
			log.Noticef("New summoner found: %s (among %d already known)", summoner, len(knownSummoners))
		}
	}
}

// setUpLogger prepares the logging utility.
func setUpLogger() {
	format := logging.MustStringFormatter(
		`%{color}%{time:15:04:05.000} %{shortfunc} ▶ %{level:.4s}%{color:reset} %{message}`,
	)
	backend := logging.NewLogBackend(os.Stderr, "", 0)
	formatted := logging.NewBackendFormatter(backend, format)
	leveled := logging.AddModuleLevel(formatted)
	leveled.SetLevel(logLevel, "")

	logging.SetBackend(leveled)
}

func main() {
	setUpLogger()

	var flagRegion string
	var fetcherAddr string
	flag.StringVar(&flagRegion, "region", defaultRegion.String(),
		"region on which match will be fetched")
	flag.StringVar(&fetcherAddr, "fetcher_addr", "",
		"fetcher server address. Required.")
	flag.Parse()

	if fetcherAddr == "" {
		log.Critical("Required flag 'fetcher_addr' not provided. Aborting.")
		os.Exit(2)
	}
	if parsedRegion, ok := lolpb.Region_value[strings.ToUpper(flagRegion)]; ok {
		region = lolpb.Region(parsedRegion)
	} else {
		log.Critical("Unable to parse region flag.")
		os.Exit(2)
	}

	conn, err := grpc.Dial(fetcherAddr, grpc.WithInsecure())
	if err != nil {
		log.Criticalf("Unable to reach server at %s: %q", fetcherAddr, err)
		os.Exit(2)
	}
	defer conn.Close()
	client = fetcherpb.NewMatchFetcherClient(conn)

	populateCache(conn)
}
