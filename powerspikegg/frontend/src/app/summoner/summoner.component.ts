import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { SummonerService } from './summoner.service';
import { SummonerData } from '../models/summonerData';


@Component({
  selector: 'app-summoner',
  templateUrl: './summoner.component.html',
})
export class SummonerComponent implements OnInit {

  private showSpinner: boolean;
  private summonerData: SummonerData;

  constructor(private summonerService: SummonerService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.showSpinner = true;
    this.route.params
      .map((params: Params) => params['name'])
      .subscribe(name => {
        this.getSummonerDataByName(name);
      })
  }

  getSummonerDataByName(summonerName: string) {
    this.summonerService.getSummonerByName(summonerName).subscribe(
      response => this.getSummonerDataByNameSuccess(response),
      error => this.errorHandler(error)
    )
  }

  getSummonerDataByNameSuccess(response: any) {
    this.summonerData = response;
    this.showSpinner = false;
  }

  errorHandler(error: any) {
    let logStr = '[ERROR] [RESULTS SERVICE] ' + error;
    console.log(logStr);
    this.showSpinner = false;
  }

}
