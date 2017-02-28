package main

import (
	"context"
	"flag"
	"fmt"
	"os"
	"strings"
	"io"
	"errors"

	"github.com/golang/protobuf/proto"
	"github.com/google/subcommands"

	fetcherpb "powerspike.gg/powerspikegg/rawdata/fetcher/service_gopb"
	lolpb "powerspike.gg/powerspikegg/rawdata/public/leagueoflegends_gopb"
)

type summonerCommand struct {
	base

	// flags
	regionFlag string

	// parsed flags / arguments
	summonerName string
	region lolpb.Region

}


// registerSummonerCommand create a new summoner command and registers it into subcommands.
func registerSummonerCommand() {
	command := &summonerCommand{}

	command.Initialize(
		"summoner",
		"Fetch summoner matches based on the summoner name",
		"Query the rawdata fetcher in order to update a summoner and returns the list of updated matches.\n"+
			"usage: fetch summoner [flags] <summoner name>\n",
	)

	subcommands.Register(command, "")
}


func (c *summonerCommand) displaySummonerMatchResults(ctx context.Context, client fetcherpb.MatchFetcherClient, summonerName string) error {
	summoner := &lolpb.Summoner {
		Name: summonerName,
		Region: c.region,
	}

	response, err := client.UpdateSummoner(ctx, summoner)
	if err != nil {
		return fmt.Errorf("server raised an error while updating summoner %s: %v", summoner.Name,	err)
	}

	fmt.Printf("Results for summoner %s:\n", summoner.Name)
	for {
		match, err := response.Recv()
		if err != nil {
			// End of match stream.
			if err != io.EOF {
				return fmt.Errorf("server raised an error while receiving a match from the grpc stream for summoner %s: %v\n", summoner.Name, err)
			}
			return nil
		}
		fmt.Println(proto.MarshalTextString(match))
	}
}

// SetFlags sets up the command line flags available on the summoner command.
func (c *summonerCommand) SetFlags(f *flag.FlagSet) {
	c.base.SetFlags(f)

	f.StringVar(&c.regionFlag, "region", defaultRegion.String(), "region on which the summoner account is playing")
}

func (c *summonerCommand) ParseFlags(f *flag.FlagSet) error {
	// Check region parameter.
	if parsedRegion, ok := lolpb.Region_value[strings.ToUpper(c.regionFlag)]; ok {
		c.region = lolpb.Region(parsedRegion)
	} else {
		return fmt.Errorf("unknown / unsupported region: %v", c.regionFlag)
	}

	if len(f.Args()) != 1 {
		return errors.New("please specify one summoner name")
	}
	c.summonerName = f.Args()[0]

	return nil
}

// TODO(ArchangelX360): implement update by summonder ID
func (c *summonerCommand) Execute(ctx context.Context, f *flag.FlagSet, _ ...interface{}) subcommands.ExitStatus {
	if err := c.ParseFlags(f); err != nil {
		fmt.Fprintln(os.Stderr, err)
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

	if err := c.displaySummonerMatchResults(ctx, client, c.summonerName); err != nil {
		fmt.Fprintln(os.Stderr, err)
		return subcommands.ExitFailure
	}

	return subcommands.ExitSuccess
}
