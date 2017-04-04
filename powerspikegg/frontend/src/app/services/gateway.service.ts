import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { MATCH_API_URL, SUMMONER_API_URL } from '../config/gateway';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatchQuery, SummonerQuery } from '../models/gateway-queries';
import { game } from '../models/protos/bundle';
import MatchReference = game.leagueoflegends.MatchReference;
import Summoner = game.leagueoflegends.Summoner;
import { isUndefined } from 'util';

@Injectable()
export class GatewayService {

  // TODO: move into utility
  private static sanitizeSummonerName(name: string): string {
    return name.replace(/ /g, '').toLocaleLowerCase();
  }

  constructor(private http: Http) { }

  getMatch(query: MatchQuery): Observable<MatchReference> {
    return this.http.get(MATCH_API_URL + '/' + query.id + '/' + query.region)
      .map(response => response.json() || {})
      .catch(error => Observable.throw(error));
  }

  getSummonerMatches(query: SummonerQuery): Observable<MatchReference[]> {
    return this.http.get(SUMMONER_API_URL + '/' + query.name + '/' + query.region)
      .map(response => response.json().results || {})
      .catch(error => Observable.throw(error));
  }

  getSummonerByName(query: SummonerQuery): Observable<Summoner> {
    const summonerName: string = GatewayService.sanitizeSummonerName(query.name);
    console.log("Calling: " + SUMMONER_API_URL + '/' + summonerName + '/' + query.region);
    return this.http.get(SUMMONER_API_URL + '/' + summonerName + '/' + query.region)
      .flatMap(response => {
        const results =  response.json().results;
        if (results.length > 0) {
          return this.getSummonerFromMatchReference(summonerName, results[0])
        } else {
          Observable.throw("No matches for this summoner")
        }
      })
      .catch(error => {
        return Observable.throw(error)
      });
  }

  private getSummonerFromMatchReference(summonerName: string, m: MatchReference): Observable<Summoner> {
    // Finding the summoner asked Participant object
    const matchingParticipants = m.detail.teams.map(team => team.participants.find(p => p.summoner.name === summonerName)).filter(sum => !isUndefined(sum));
    // TODO(ArchangelX360): better pipeline to directly return the correct participant
    if (matchingParticipants.length > 0) {
      const summoner = new Summoner(matchingParticipants[0].summoner);
      return Observable.of(summoner);
    }
    return Observable.throw("Summoner not found")
  }

  // TODO(ArchangelX360): aggregation and computation request

}