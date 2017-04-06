import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { isUndefined } from 'util';

import { AGGREGATION_API_URL, COMPUTATION_API_URL, MATCH_API_URL, SUMMONER_API_URL } from '../config/gateway';
import { AggregationQuery, ComputationQuery, MatchQuery, SummonerQuery } from '../models/gateway-queries';
import { fetcher, game, serving } from '../models/protos/bundle';
import { SummonerWithMatches } from "app/models/summoner-with-matches";
import AggregatedStatistics = fetcher.rds.AggregatedStatistics;
import Statistics = serving.Statistics;
import MatchReference = game.leagueoflegends.MatchReference;
import Summoner = game.leagueoflegends.Summoner;
import MatchComputationFeature = serving.MatchComputationFeature;

@Injectable()
export class GatewayService {

  // TODO: move into utility
  private static sanitizeSummonerName(name: string): string {
    return name.replace(/ /g, '');
  }

  constructor(private http: Http) {
  }

  getMatch(query: MatchQuery): Observable<MatchReference> {
    const url = MATCH_API_URL + '/' + query.id + '/' + query.region
    console.log('Calling: ' + url);
    return this.http.get(url)
      .map(response => response.json() || {})
      .catch(error => Observable.throw(error));
  }

  getSummonerMatches(query: SummonerQuery): Observable<MatchReference[]> {
    const summonerName: string = GatewayService.sanitizeSummonerName(query.name);
    const url = SUMMONER_API_URL + '/' + summonerName + '/' + query.region;
    console.log('Calling: ' + url);
    return this.http.get(url)
      .map(response => response.json().results || {})
      .catch(error => Observable.throw(error));
  }

  getSummonerByName(query: SummonerQuery): Observable<SummonerWithMatches> {
    const summonerName: string = GatewayService.sanitizeSummonerName(query.name);
    const url = SUMMONER_API_URL + '/' + summonerName + '/' + query.region;
    console.log('Calling: ' + url);
    return this.http.get(url)
      .flatMap(response => {
        const results = response.json().results;
        if (results.length > 0) {
          return this.getSummonerFromMatchReference(summonerName, results);
        } else {
          Observable.throw('No matches for summoner ' + query.name + '.');
        }
      })
      .catch(error => {
        return Observable.throw(error);
      });
  }

  private getSummonerFromMatchReference(summonerName: string, matches: MatchReference[]): Observable<SummonerWithMatches> {
    // Finding the summoner asked Participant object
    const m = matches[0];
    const matchingParticipants = m.detail.teams.map(team => team.participants.find(p => {
      return GatewayService.sanitizeSummonerName(p.summoner.name.toLocaleLowerCase()) === GatewayService.sanitizeSummonerName(summonerName.toLocaleLowerCase());
    })).filter(sum => !isUndefined(sum));
    // TODO(ArchangelX360): better pipeline to directly return the correct participant
    if (matchingParticipants.length > 0) {
      const summoner = new Summoner(matchingParticipants[0].summoner);
      const summonerWithMatches = {
        summoner: summoner,
        matches: matches,
      };
      return Observable.of(summonerWithMatches);
    }
    return Observable.throw('Summoner ' + summonerName + 'not found.');
  }

  getAverageStatistics(query: AggregationQuery): Observable<AggregatedStatistics> {
    const url = AGGREGATION_API_URL + '/' + query.league + '/' + query.championID + '/' + query.summonerID + '/' + query.region;
    console.log('Calling: ' + url);
    return this.http.get(url)
      .map(response => response.json() || {})
      .catch(error => Observable.throw(error));
  }

  getComputedStatistics(query: ComputationQuery): Observable<MatchComputationFeature> {
    const url = COMPUTATION_API_URL + '/' + query.summonerID + '/' + query.matchID + '/' + query.region;
    console.log('Calling: ' + url);
    return this.http.get(url)
      .map(response => response.json() || {})
      .catch(error => Observable.throw(error));
  }

}
