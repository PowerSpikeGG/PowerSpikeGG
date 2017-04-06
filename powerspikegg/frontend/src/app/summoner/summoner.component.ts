import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdSnackBar } from "@angular/material";

import { game } from '../models/protos/bundle';
import { GatewayService } from '../services/gateway.service';
import { SummonerQuery } from '../models/gateway-queries';
import { SummonerWithMatches } from '../models/summoner-with-matches';
import Summoner = game.leagueoflegends.Summoner;
import MatchReference = game.leagueoflegends.MatchReference;

@Component({
  selector: 'app-summoner',
  templateUrl: './summoner.component.html',
  styleUrls: ['./summoner.component.css']
})
export class SummonerComponent implements OnInit {

  private showSpinner: boolean;
  private summoner: Summoner;
  private matches: MatchReference[];

  constructor(private gatewayService: GatewayService,
              private route: ActivatedRoute,
              private snackBar: MdSnackBar,) {
  }

  ngOnInit() {
    this.showSpinner = true;
    this.route.params
      .subscribe(params => {
        this.getSummonerDataByName({
          'name': params['name'],
          'region': params['region']
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

  getSummonerDataByNameSuccess(response: SummonerWithMatches) {
    this.summoner = response.summoner;
    this.matches = response.matches;
    this.showSpinner = false;
  }

  errorHandler(error: any) {
    this.snackBar.open('[ERROR] ' + error + '.', 'Ok');
    this.showSpinner = false;
  }

}
