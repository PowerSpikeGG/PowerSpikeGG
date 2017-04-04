import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { game } from '../models/protos/bundle';
import Summoner = game.leagueoflegends.Summoner;
import { GatewayService } from '../services/gateway.service';
import { SummonerQuery } from '../models/gateway-queries';

@Component({
  selector: 'app-summoner',
  templateUrl: './summoner.component.html',
  styleUrls: ['./summoner.component.css']
})
export class SummonerComponent implements OnInit {

  private showSpinner: boolean;
  private summoner: Summoner;

  constructor(private gatewayService: GatewayService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.showSpinner = true;
    this.route.params
      .subscribe(params => {
        this.getSummonerDataByName({
          'name': params.name,
          'region': params.region
        });
      })
  }

  getSummonerDataByName(summonerQuery: SummonerQuery) {
    this.gatewayService.getSummonerByName(summonerQuery).subscribe(
      response => {
        this.getSummonerDataByNameSuccess(response)
      },
      error => this.errorHandler(error)
    )
  }

  getSummonerDataByNameSuccess(response: Summoner) {
    this.summoner = response;
    this.showSpinner = false;
  }

  errorHandler(error: any) {
    let logStr = '[ERROR] [RESULTS SERVICE] ' + error;
    console.log(logStr);
    this.showSpinner = false;
  }

}
