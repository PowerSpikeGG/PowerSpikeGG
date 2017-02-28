package main

import (
	"context"
	"flag"
	"fmt"
	"os"
	"strconv"
	"strings"
	"sync"

	"github.com/golang/protobuf/proto"
	"github.com/google/subcommands"

	fetcherpb "powerspike.gg/powerspikegg/rawdata/fetcher/service_gopb"
	lolpb "powerspike.gg/powerspikegg/rawdata/public/leagueoflegends_gopb"
)

const defaultRegion = lolpb.Region_EUW

type matchCommand struct {
	base

	// flags
	regionFlag string

	// parsed flags / arguments
	region   lolpb.Region
	matchIDs []int64

	// coroutines synchronisation
	waitGroup    *sync.WaitGroup
	displayMutex *sync.Mutex
	hasError     bool
}

// registerMatchCommand create a new match command and registers it into subcommands.
func registerMatchCommand() {
	command := &matchCommand{
		waitGroup:    &sync.WaitGroup{},
		displayMutex: &sync.Mutex{},
	}

	command.Initialize("match", "Fetch matches based on their IDs",
		"Query the rawdata fetcher in order to retrieve matches based on their IDs. "+
			"Use -region to change the default region.",
	)

	subcommands.Register(command, "")
}

// SetFlags sets up the command line flags available on the match command
func (c *matchCommand) SetFlags(f *flag.FlagSet) {
	c.base.SetFlags(f)

	f.StringVar(&c.regionFlag, "region", defaultRegion.String(), "region on which the matches was played")
}

// displayMatchResults asynchroneoulsy fetch and display match results.
func (c *matchCommand) displayMatchResults(ctx context.Context, client fetcherpb.MatchFetcherClient, matchId int64) {
	defer c.waitGroup.Done()

	request := &fetcherpb.MatchRequest{
		Id:     matchId,
		Region: c.region,
	}
	response, err := client.Match(ctx, request)

	c.displayMutex.Lock()
	defer c.displayMutex.Unlock()
	if err != nil {
		fmt.Fprintf(os.Stderr, "server raised an error while getting match %d: %v", matchId, err)
		c.hasError = true
		return
	}
	fmt.Printf("Results for match ID %d:\n", matchId)
	fmt.Println(proto.MarshalTextString(response))
}

// ParseFlags parses the given flags to ensure they are correct.
func (c *matchCommand) ParseFlags(f *flag.FlagSet) error {
	// Check region parameter.
	if parsedRegion, ok := lolpb.Region_value[strings.ToUpper(c.regionFlag)]; ok {
		c.region = lolpb.Region(parsedRegion)
	} else {
		return fmt.Errorf("unknown / unsupported region: %v", c.regionFlag)
	}

	// Check args are integers.
	for _, arg := range f.Args() {
		matchID, err := strconv.ParseInt(arg, 10, 64)
		if err != nil {
			return fmt.Errorf("invalid match id: %s", arg)
		}
		c.matchIDs = append(c.matchIDs, matchID)
	}

	return nil
}

// Execute run the command 'match'.
func (c *matchCommand) Execute(ctx context.Context, f *flag.FlagSet, _ ...interface{}) subcommands.ExitStatus {
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
	for _, matchID := range c.matchIDs {
		c.waitGroup.Add(1)
		go c.displayMatchResults(ctx, client, matchID)
	}
	c.waitGroup.Wait()

	if c.hasError {
		return subcommands.ExitFailure
	}
	return subcommands.ExitSuccess
}
