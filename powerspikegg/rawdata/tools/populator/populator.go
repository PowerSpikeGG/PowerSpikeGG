package main

import (
	"errors"
	"flag"
	"io"
	"os"
	"strings"

	"github.com/oleiade/lane"
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
	log = logging.MustGetLogger("populator")
)

// summonerFetcher is an utility struct used to contain several requirement for
// the cache population logic.
type summonerFetcher struct {
	// client is used to reach the fetcher
	client fetcherpb.MatchFetcherClient
	// knownSummoners is the set containing summoners already fetched
	knownSummoners map[string]bool
	// region is the region on which summoners are playing
	region lolpb.Region
	// summonerCount is the number of suummoner fetched
	summonerCount int
	// summonerQueue is the queue containing non-fetched summoners
	summonerQueue *lane.Queue
}

// enqueueNewSummoners get summoners from the match and enqueue summoners that
// were not already fetched.
func (f *summonerFetcher) enqueueNewSummoners(match *lolpb.MatchReference) error {
	if match == nil || match.Detail == nil || match.Detail.Teams == nil {
		return errors.New("match does not contain expected data")
	}
	for _, team := range match.Detail.Teams {
		for _, participant := range team.Participants {
			summoner := participant.Summoner.Name
			if _, ok := f.knownSummoners[summoner]; !ok {
				log.Debugf("New summoner from match %d: %s", match.Id, summoner)
				f.summonerQueue.Enqueue(summoner)
				f.knownSummoners[summoner] = true
			}
		}
	}
	return nil
}

// getConnectedSummoners retrieve from the fetcher the summoners that played
// with the summoner given as parameter.
func (f *summonerFetcher) getConnectedSummoners(ctx context.Context, summoner string) {
	request := &lolpb.Summoner{
		Name:   summoner,
		Region: f.region,
	}

	response, err := f.client.UpdateSummoner(ctx, request)
	if err != nil {
		log.Errorf("Unable to fetch summoner '%s' information: %q", summoner, err)
		return
	}

	for {
		match, err := response.Recv()
		if err == io.EOF {
			log.Debugf("Done fetching all connected summoners of %s", summoner)
			return
		}
		if err != nil {
			log.Errorf("Error while fetching summoner '%s' matches: %q", summoner, err)
			return
		}
		log.Debugf("Got match ID %d", match.Id)

		// Feed the channel with the summoners in the match.
		f.enqueueNewSummoners(match)
	}
}

// populateCache get recursively all connected summoners of the ones given as
// parameter.
func (f *summonerFetcher) populateCache(ctx context.Context, summoners []string) {
	for _, summoner := range summoners {
		f.summonerQueue.Enqueue(summoner)
		f.knownSummoners[summoner] = true
	}

	// Cast interface into string. If the queue is empty, Dequeue will return
	// nil which is not castable to string.
	for f.summonerQueue.Head() != nil {
		if summoner, ok := f.summonerQueue.Dequeue().(string); ok {
			f.getConnectedSummoners(ctx, summoner)
			f.summonerCount++
			log.Noticef("Done fetching %s (%d/%d summoner fetched).", summoner, f.summonerCount, len(f.knownSummoners))
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

	// Ensure flags are valid
	if fetcherAddr == "" {
		log.Critical("Required flag 'fetcher_addr' not provided. Aborting.")
		os.Exit(2)
	}
	var region lolpb.Region
	if parsedRegion, ok := lolpb.Region_value[strings.ToUpper(flagRegion)]; ok {
		region = lolpb.Region(parsedRegion)
	} else {
		log.Critical("Unable to parse region flag.")
		os.Exit(2)
	}
	if len(flag.Args()) < 1 {
		log.Critical("usage: fetch [flag] <summoner> [summoner] ...")
		os.Exit(2)
	}

	// Initialize connection
	conn, err := grpc.Dial(fetcherAddr, grpc.WithInsecure())
	if err != nil {
		log.Criticalf("Unable to reach server at %s: %q", fetcherAddr, err)
		os.Exit(2)
	}
	defer conn.Close()
	client := fetcherpb.NewMatchFetcherClient(conn)

	// Start populating
	fetcher := summonerFetcher{
		client:         client,
		knownSummoners: make(map[string]bool),
		region:         region,
		summonerCount:  0,
		summonerQueue:  lane.NewQueue(),
	}
	fetcher.populateCache(context.Background(), flag.Args())
}
