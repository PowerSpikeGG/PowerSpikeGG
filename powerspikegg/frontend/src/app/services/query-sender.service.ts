import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import {summonerQuery} from "../models/summonerQuery";

@Injectable()
export class QuerySenderService {

  constructor(private http: Http) {
  }

  sendSummonerQuery(summonerQuery: string): Observable<summonerQuery> {
    let url = 'api/summoner?name='+summonerQuery;
    return this.http.get(url)
      .map(response => <summonerQuery> response.json())
      .catch(error => Observable.throw(error));
  }

}
