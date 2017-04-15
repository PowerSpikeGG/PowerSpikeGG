package main

import (
	"flag"
	"testing"

	"github.com/golang/protobuf/proto"

	fetcherpb "powerspike.gg/powerspikegg/rawdata/fetcher/service_gopb"
	lolpb "powerspike.gg/powerspikegg/rawdata/public/leagueoflegends_gopb"
)

// TestQueryMessageConversion ensures query message is correctly converted from flags.
func TestQueryMessageConversion(t *testing.T) {
	tt := []struct {
		name          string
		command       *cacheToCSVCommand
		hasError      bool
		expectedQuery *fetcherpb.Query
	}{
		{
			name:          "empty query message (wildcard selection)",
			command:       &cacheToCSVCommand{},
			expectedQuery: &fetcherpb.Query{},
		},
		{
			name: "entry with bronze league flag",
			command: &cacheToCSVCommand{
				leagueFlag: "bronze",
			},
			expectedQuery: &fetcherpb.Query{
				League: lolpb.League_BRONZE,
			},
		},
		{
			name: "entry with silver league flag",
			command: &cacheToCSVCommand{
				leagueFlag: "silver",
			},
			expectedQuery: &fetcherpb.Query{
				League: lolpb.League_SILVER,
			},
		},
		{
			name: "entry with capitalized silver league flag",
			command: &cacheToCSVCommand{
				leagueFlag: "Silver",
			},
			expectedQuery: &fetcherpb.Query{
				League: lolpb.League_SILVER,
			},
		},
		{
			name: "entry with invalid league flag",
			command: &cacheToCSVCommand{
				leagueFlag: "foobar",
			},
			hasError: true,
		},
		{
			name: "entry with champion id 111",
			command: &cacheToCSVCommand{
				championFlag: 111,
			},
			expectedQuery: &fetcherpb.Query{
				Champion: &lolpb.Champion{
					Id: 111,
				},
			},
		},
		{
			name: "entry with champion id 222",
			command: &cacheToCSVCommand{
				championFlag: 222,
			},
			expectedQuery: &fetcherpb.Query{
				Champion: &lolpb.Champion{
					Id: 222,
				},
			},
		},
		{
			name: "entry with a summoner name foobar",
			command: &cacheToCSVCommand{
				summonerNameFlag: "foobar",
			},
			expectedQuery: &fetcherpb.Query{
				Summoner: &lolpb.Summoner{
					Name: "foobar",
				},
			},
		},
		{
			name: "entry with a summoner name Foo Bar",
			command: &cacheToCSVCommand{
				summonerNameFlag: "Foo Bar",
			},
			expectedQuery: &fetcherpb.Query{
				Summoner: &lolpb.Summoner{
					Name: "Foo Bar",
				},
			},
		},
		{
			name: "composed entry with league and champion",
			command: &cacheToCSVCommand{
				leagueFlag:   "bronze",
				championFlag: 111,
			},
			expectedQuery: &fetcherpb.Query{
				League:   lolpb.League_BRONZE,
				Champion: &lolpb.Champion{Id: 111},
			},
		},
	}

	for _, testValue := range tt {
		actualQuery, err := testValue.command.convertFlagsToQuery()

		if err != nil {
			if !testValue.hasError {
				t.Errorf("unexpected error returned: %q", err)
			}
			continue
		}

		if !proto.Equal(actualQuery, testValue.expectedQuery) {
			t.Errorf(
				"expected query does not match actual query.\nExpected %v\nActual: %v",
				proto.MarshalTextString(testValue.expectedQuery),
				proto.MarshalTextString(actualQuery),
			)
		}
	}
}

// TestFlagAssignation ensures flags are correctly assigned.
func TestFlagAssignation(t *testing.T) {
	tt := []struct {
		name            string
		args            []string
		hasError        bool
		expectedCommand *cacheToCSVCommand
	}{
		{
			name:            "ensure default values are correct",
			args:            []string{},
			expectedCommand: &cacheToCSVCommand{},
		},
		{
			name: "ensure flag values are correctly assigned",
			args: []string{
				"-league=bronze",
				"-champion=111",
				"-summoner=foobar",
			},
			expectedCommand: &cacheToCSVCommand{
				leagueFlag:       "bronze",
				championFlag:     111,
				summonerNameFlag: "foobar",
			},
		},
		{
			name:     "ensure flag parsing raise error on invalid champion flag",
			args:     []string{"-champion=abc"},
			hasError: true,
		},
	}

	for _, testValue := range tt {
		flagSet := flag.NewFlagSet(testValue.name, flag.ContinueOnError)
		command := &cacheToCSVCommand{}
		command.SetFlags(flagSet)

		if err := flagSet.Parse(testValue.args); err != nil {
			if !testValue.hasError {
				t.Errorf("unexpected error while parsing flags: %v", err)
			}
			continue
		}

		if command.leagueFlag != testValue.expectedCommand.leagueFlag {
			t.Errorf(
				"unexpected value for flag league:\nExpected: %v\nActual: %v",
				testValue.expectedCommand.leagueFlag, command.leagueFlag,
			)
		}
	}
}

// TestConversionToStatsArray ensures the conversion from match proto to stringified arrray is correctly done.
func TestConverrsionToStatsArray(t *testing.T) {
	participant := &lolpb.Participant{
		Statistics: &lolpb.PlayerStatistics{
			Kills:         1,
			Deaths:        2,
			Assists:       3,
			ChampionLevel: 4,
			MagicDamages: &lolpb.DamageStatistic{
				Total:       5,
				ToChampions: 6,
				Taken:       7,
			},
			PhysicalDamages: &lolpb.DamageStatistic{
				Total:       8,
				ToChampions: 9,
				Taken:       10,
			},
			TrueDamages: &lolpb.DamageStatistic{
				Total:       11,
				ToChampions: 12,
				Taken:       13,
			},
			TotalDamages: &lolpb.DamageStatistic{
				Total:       14,
				ToChampions: 15,
				Taken:       16,
			},
			TotalHeal:                        17,
			LargestCriticalStrike:            18,
			GoldEarned:                       19,
			MinionsKilled:                    20,
			NeutralMinionsKilled:             21,
			NeutralMinionsKilledEnnemyJungle: 22,
			NeutralMinionsKilledTeamJungle:   23,
			SightWardsBought:                 24,
			WardsPlaced:                      25,
			WardsKilled:                      26,
			DoubleKills:                      27,
			TripleKills:                      28,
			QuadraKills:                      29,
			PentaKills:                       30,
			KillingSprees:                    31,
			LargestKillingSpree:              32,
			LargestMultiKill:                 33,
			InhibitorKills:                   34,
			TowerKills:                       35,
			FirstBloodAssist:                 true,
			FirstBloodKill:                   true,
			FirstInhibitorKill:               true,
			FirstTowerAssist:                 true,
			FirstTowerKill:                   true,
			TotalCrowdControl:                36,
			TotalUnitsHealed:                 37,
		},
		Champion: &lolpb.Champion{
			Id: 38,
		},
		Summoner: &lolpb.Summoner{
			League: lolpb.League_BRONZE,
		},
	}

	team := &lolpb.TeamDetail{
		Winner: true,
	}

	match := &lolpb.MatchReference{
		Detail: &lolpb.MatchDetail{
			Duration: 39,
		},
	}

	command := &cacheToCSVCommand{}
	_, err := command.toStatsArray(participant, team, match)
	if err != nil {
		t.Errorf("non null error while converting participant: %v", err)
	}
}
