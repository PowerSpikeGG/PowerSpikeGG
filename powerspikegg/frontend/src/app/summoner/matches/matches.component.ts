import { Component, Input, OnInit } from '@angular/core';
import { GatewayService } from '../../services/gateway.service';

import { MdSnackBar } from '@angular/material';
import { game } from '../../models/protos/bundle';
import MatchReference = game.leagueoflegends.MatchReference;
import Summoner = game.leagueoflegends.Summoner;
import Region = game.leagueoflegends.Region;

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
})
export class MatchesComponent implements OnInit {

  @Input() summoner: Summoner;
  @Input() matches: MatchReference[];

  constructor() { }

  ngOnInit() {
  }

}
