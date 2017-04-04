export interface MatchQuery {
  id: number;
  region: string;
}

export interface SummonerQuery {
  name: string;
  region: string;
}

export interface AggregationQuery {
  league: string;
  championID: number;
  summonerID: number;
  region: string;
}

export interface ComputationQuery {
  matchID: number;
  summonerID: number;
  region: string;
}