package main

import (
	"context"
	"errors"
	"flag"
	"fmt"
	"strconv"
	"strings"

	"github.com/google/subcommands"

	fetcherpb "powerspike.gg/powerspikegg/rawdata/fetcher/service_gopb"
	lolpb "powerspike.gg/powerspikegg/rawdata/public/leagueoflegends_gopb"
)

// List of CSV headers. Useful if we want to order results differently.
// NOTE: this constant is defined as var instead of const because go does not
//       support mutable types as constants.
// NOTE: we might remove this constant later, since it is only ordered
//       alphabetically.
var statHeaders = []string{
	"assists",
	"champLevel",
	"championId",
	"deaths",
	"doubleKills",
	"firstBloodAssist",
	"firstBloodKill",
	"firstInhibitorKill",
	"firstTowerAssist",
	"firstTowerKill",
	"goldEarned",
	"goldSpent",
	"inhibitorKills",
	// TODO(funkysayu): Support items
	"killingSprees",
	"kills",
	"largestCriticalStrike",
	"largestKillingSpree",
	"largestMultiKill",
	"league",
	"magicDamageDealt",
	"magicDamageDealtToChampions",
	"magicDamageTaken",
	"matchDuration",
	"minionsKilled",
	"neutralMinionsKilled",
	"neutralMinionsKilledEnnemyJungle",
	"neutralMinionsKilledTeamJungle",
	"pentaKills",
	"physicalDamageDealt",
	"physicalDamageDealtToChampions",
	"physicalDamageTaken",
	"quadraKills",
	"role",
	"sightWardsBoughtInGame",
	"totalDamageDealt",
	"totalDamageDealtToChampions",
	"totalDamageTaken",
	"totalHeal",
	"totalTimeCrowdControlDealt",
	"totalUnitsHealed",
	"towerKills",
	"tripleKills",
	"trueDamageDealt",
	"trueDamageDealtToChampions",
	"trueDamageTaken",
	"visionWardsBoughtInGame",
	"wardsKilled",
	"wardsPlaced",
	"winner",
}

// Float number precision. Note that 2 is enough in almost all situations.
const floatPrecision = 2

// cacheToCSVCommand is a command converting a list of matches to a CSV.
//
// This is an utility used to query the rawdata fetcher cache. The goal is to
// provide an helper tool for statistitians that want to work on large datasets
// of matchs with existing tools in other languages (such as R for example).
//
// IMPORTANT NOTE: this is only a tool and it is not intended to be included in
// the stack.
type cacheToCSVCommand struct {
	base

	// flags
	leagueFlag       string // result filtering utility
	championFlag     int    // result filtering utility
	summonerNameFlag string // result filtetring utility
	limitFlag        int    // maximum quantity of matches that can be fetch
}

// regiserCacheToCSVCommand creates a new cache2csv command an registers it into subcommands.
func registerCacheToCSVCommand() {
	command := &cacheToCSVCommand{}

	command.Initialize(
		"cache2csv",
		"Fetch matches from cache and convert it to statistics CSV.",
		"Query the fetcher's cache to get several matches and convert them to CSV of player statistics.",
	)

	subcommands.Register(command, "")
}

// SetFlags sets up the command line flags available on cache2csv command.
func (c *cacheToCSVCommand) SetFlags(f *flag.FlagSet) {
	c.base.SetFlags(f)

	f.StringVar(&c.leagueFlag, "league", "", "filtering option by league")
	f.IntVar(&c.championFlag, "champion", 0, "filtering option by champion ID")
	f.StringVar(&c.summonerNameFlag, "summoner", "", "filtering option by summoner name")
}

// convertFlagsToQuery converts the flags given as parameter to a query message.
func (c *cacheToCSVCommand) convertFlagsToQuery() (*fetcherpb.Query, error) {
	query := &fetcherpb.Query{}

	if c.leagueFlag != "" {
		if league, ok := lolpb.League_value[strings.ToUpper(c.leagueFlag)]; ok {
			query.League = lolpb.League(league)
		} else {
			return nil, fmt.Errorf("unsupported league value: %v", c.leagueFlag)
		}
	}

	if c.championFlag != 0 {
		query.Champion = &lolpb.Champion{Id: int32(c.championFlag)}
	}

	if c.summonerNameFlag != "" {
		query.Summoner = &lolpb.Summoner{Name: c.summonerNameFlag}
	}

	return query, nil
}

// TODO(funkysayu): this all should be part of a structure
// asInt converts an integer to a string.
func asInt(value int32) string {
	return strconv.FormatInt(int64(value), 10)
}

// asFloat converrts a float to a string.
func asFloat(value float64) string {
	return strconv.FormatFloat(value, 'f', floatPrecision, 64)
}

// asBool converts a bool to a string.
func asBool(value bool) string {
	return strconv.FormatBool(value)
}

// toStatsArray converts a match to a formatted statistic array.
func (c *cacheToCSVCommand) toStatsArray(participant *lolpb.Participant, team *lolpb.TeamDetail, match *lolpb.MatchReference) ([]string, error) {
	stats := participant.Statistics
	if stats == nil {
		return nil, errors.New("Statistics attribute missing in the Participant message")
	}
	if participant.Champion == nil {
		return nil, errors.New("Champion attribute missing in the Participant message")
	}
	if participant.Summoner == nil {
		return nil, errors.New("Summoner attribute missing in the Participant message")
	}

	namedValues := map[string]string{
		// General information
		"winner":        asBool(team.Winner),
		"role":          participant.Role.String(),
		"league":        participant.Summoner.League.String(),
		"championId":    asInt(participant.Champion.Id),
		"matchDuration": asFloat(match.Detail.Duration),
		"champLevel":    asFloat(stats.ChampionLevel),
		// KDA
		"kills":   asFloat(stats.Kills),
		"deaths":  asFloat(stats.Deaths),
		"assists": asFloat(stats.Assists),
		// Damage metrics
		"magicDamageDealt":               asFloat(stats.MagicDamages.Total),
		"magicDamageDealtToChampions":    asFloat(stats.MagicDamages.ToChampions),
		"magicDamageTaken":               asFloat(stats.MagicDamages.Taken),
		"physicalDamageDealt":            asFloat(stats.PhysicalDamages.Total),
		"physicalDamageDealtToChampions": asFloat(stats.PhysicalDamages.ToChampions),
		"physicalDamageTaken":            asFloat(stats.PhysicalDamages.Taken),
		"trueDamageDealt":                asFloat(stats.TrueDamages.Total),
		"trueDamageDealtToChampions":     asFloat(stats.TrueDamages.ToChampions),
		"trueDamageTaken":                asFloat(stats.TrueDamages.Taken),
		"totalDamageDealt":               asFloat(stats.TotalDamages.Total),
		"totalDamageDealtToChampions":    asFloat(stats.TotalDamages.ToChampions),
		"totalDamageTaken":               asFloat(stats.TotalDamages.Taken),
		"totalHeal":                      asFloat(stats.TotalHeal),
		"largestCriticalStrike":          asFloat(stats.LargestCriticalStrike),
		// Gold and minions
		"goldEarned":                       asFloat(stats.GoldEarned),
		"goldSpent":                        asFloat(stats.GoldSpent),
		"minionsKilled":                    asFloat(stats.MinionsKilled),
		"neutralMinionsKilled":             asFloat(stats.NeutralMinionsKilled),
		"neutralMinionsKilledEnnemyJungle": asFloat(stats.NeutralMinionsKilledEnnemyJungle),
		"neutralMinionsKilledTeamJungle":   asFloat(stats.NeutralMinionsKilledTeamJungle),
		// Vision
		"sightWardsBoughtInGame":  asFloat(stats.SightWardsBought),
		"visionWardsBoughtInGame": asFloat(stats.VisionWardsBought),
		"wardsPlaced":             asFloat(stats.WardsPlaced),
		"wardsKilled":             asFloat(stats.WardsKilled),
		// Multi kills
		"doubleKills":         asFloat(stats.DoubleKills),
		"tripleKills":         asFloat(stats.TripleKills),
		"quadraKills":         asFloat(stats.QuadraKills),
		"pentaKills":          asFloat(stats.PentaKills),
		"killingSprees":       asFloat(stats.KillingSprees),
		"largestKillingSpree": asFloat(stats.LargestKillingSpree),
		"largestMultiKill":    asFloat(stats.LargestMultiKill),
		// Objective assistance
		"inhibitorKills": asFloat(stats.InhibitorKills),
		"towerKills":     asFloat(stats.TowerKills),
		// Flags
		"firstBloodAssist":   asBool(stats.FirstBloodAssist),
		"firstBloodKill":     asBool(stats.FirstBloodKill),
		"firstInhibitorKill": asBool(stats.FirstInhibitorKill),
		"firstTowerAssist":   asBool(stats.FirstTowerAssist),
		"firstTowerKill":     asBool(stats.FirstTowerKill),
		// Miscellaneous statistics
		"totalTimeCrowdControlDealt": asFloat(stats.TotalCrowdControl),
		"totalUnitsHealed":           asFloat(stats.TotalUnitsHealed),
	}

	var result []string
	for _, header := range statHeaders {
		if value, ok := namedValues[header]; ok {
			result = append(result, value)
		} else {
			// This error should not occurs outside of tests.
			return nil, fmt.Errorf("key %q is missing in named values", header)
		}
	}
	return result, nil
}

// Execute is the subcommand entry point for the cache2csv command.
func (c *cacheToCSVCommand) Execute(ctx context.Context, f *flag.FlagSet, _ ...interface{}) subcommands.ExitStatus {
	return subcommands.ExitSuccess
}
