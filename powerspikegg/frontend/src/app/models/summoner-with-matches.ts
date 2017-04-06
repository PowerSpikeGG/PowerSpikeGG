import { game } from './protos/bundle';
import Summoner = game.leagueoflegends.Summoner;
import MatchReference = game.leagueoflegends.MatchReference;
export interface SummonerWithMatches {
  summoner: Summoner;
  matches: MatchReference[];
}