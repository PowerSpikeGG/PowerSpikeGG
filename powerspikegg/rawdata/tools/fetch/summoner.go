package main

import (
	"context"
	"flag"
	"fmt"
	"os"
	"strings"
	"sync"
	"io"

	"github.com/golang/protobuf/proto"
	"github.com/google/subcommands"

	fetcherpb "powerspike.gg/powerspikegg/rawdata/fetcher/service_gopb"
	lolpb "powerspike.gg/powerspikegg/rawdata/public/leagueoflegends_gopb"
	"errors"
)

type summonerCommand struct {
	base

	// flags
	regionFlag string

	summonerId int32 // TODO: implement ID as well ?
	summonerName string
	region lolpb.Region


	displayMutex *sync.Mutex
	hasError     bool
}


// registerMatchCommand create a new match command and registers it into
// subcommands
func registerSummonerCommand() {
	command := &summonerCommand{
		displayMutex: &sync.Mutex{},
	}

	command.Initialize("summoner", "Fetch summoner matches" +
		" based on the summoner name",
		"Query the rawdata fetcher in order to update a summoner and "+
			"and returns the list of updated matches. " +
			"Use -region to change the default region.",
	)

	subcommands.Register(command, "")
}


func (c *summonerCommand) displaySummonerMatchResults(ctx context.Context,
client fetcherpb.MatchFetcherClient, summonerName string) {
	summoner := &lolpb.Summoner {
		Name: summonerName,
		Region: c.region,
	}
	response, err := client.UpdateSummoner(ctx, summoner)

	c.displayMutex.Lock()
	defer c.displayMutex.Unlock()
	if err != nil {
		fmt.Errorf("server raised an error while updating summoner %s: %v",
			summoner.Name, err)
		c.hasError = true
		return
	}
	fmt.Printf("\nResults for summoner %s:\n", summoner.Name)
	for {
		match, err := response.Recv()
		if err != nil {
			if err != io.EOF {
				fmt.Fprintf(os.Stderr, "server raised an error while receiving a " +
					"match from the grpc stream for summoner %s: %v\n",
					summoner.Name, err)
				c.hasError = true
			}
			return
		}
		fmt.Println(proto.MarshalTextString(match))
	}
}

// SetFlags sets up the command line flags available on the match command
func (c *summonerCommand) SetFlags(f *flag.FlagSet) {
	c.base.SetFlags(f)

	f.StringVar(&c.regionFlag, "region", defaultRegion.String(),
		"region on which the summoner account is created")
}

func (c *summonerCommand) ParseFlags(f *flag.FlagSet) error {
	// Check region parameter
	if parsedRegion, ok := lolpb.Region_value[strings.ToUpper(c.regionFlag)];
		ok {
		c.region = lolpb.Region(parsedRegion)
	} else {
		return fmt.Errorf("unknown / unsupported region: %v", c.regionFlag)
	}

	if len(f.Args()) <= 0 {
		return errors.New("please specify a summoner name")
	}
	c.summonerName = f.Args()[0]

	return nil
}

func (c *summonerCommand) Execute(ctx context.Context,
f *flag.FlagSet, _ ...interface{}) subcommands.ExitStatus {
	parseErr := c.ParseFlags(f)
	if parseErr != nil {
		fmt.Println(parseErr)
		return subcommands.ExitFailure
	}

	// Set up a connection to the server.
	conn, err := c.base.Connect()
	if err != nil {
		fmt.Fprintf(os.Stderr, "could not connect: %v", err)
		return subcommands.ExitFailure
	}
	defer conn.Close()

	client := fetcherpb.NewMatchFetcherClient(conn)
	c.displaySummonerMatchResults(ctx, client, c.summonerName)

	if c.hasError {
		return subcommands.ExitFailure
	}
	return subcommands.ExitSuccess
}
