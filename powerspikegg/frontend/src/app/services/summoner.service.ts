import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { SummonerData } from '../models/summonerData';

@Injectable()
export class SummonerService {

  constructor(private http: Http) {
  }

  /**
   * Request Summoner data (basic info and match history) from search-bar input string
   * @param summonerName the id and the name of the summoner
   * @returns {Observable<SummonerData>} Summoner data
   */
  getSummonerByName(summonerName: string): Observable<SummonerData> {
    let url = 'api/summoner/' + summonerName;
    return this.http.get(url)
      .map(response => <SummonerData> response.json())
      .catch(error => Observable.throw(error));
  }

}
