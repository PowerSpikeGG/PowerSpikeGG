import { Component, Input, OnInit } from '@angular/core';
import { GatewayService } from '../../services/gateway.service';

import { MdSnackBar } from '@angular/material';
import { game } from '../../models/protos/bundle';
import MatchReference = game.leagueoflegends.MatchReference;
import Summoner = game.leagueoflegends.Summoner;
import Region = game.leagueoflegends.Region;

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html'
})
export class MatchesComponent implements OnInit {

  private matches: MatchReference[];
  @Input() summoner: Summoner;

  constructor(private gatewayService: GatewayService, private snackBar: MdSnackBar) { }

  ngOnInit() {
    this.gatewayService.getSummonerMatches({name: this.summoner.name, region: this.summoner.region.toString()}).subscribe(
      (matches) => this.matches = matches,
      (error) =>  this.snackBar.open('[ERROR] Cannot retrieve matches of ' + this.summoner.name + '.', 'Ok')
    );
  }

}
