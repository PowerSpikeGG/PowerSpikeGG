import { Component, Input, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { GatewayService } from '../../../../../services/gateway.service';
import { game, serving } from '../../../../../models/protos/bundle';
import { ComputationQuery } from '../../../../../models/gateway-queries';
import Participant = game.leagueoflegends.Participant;
import MatchReference = game.leagueoflegends.MatchReference;
import Statistics = serving.Statistics;
import MatchComputationFeature = serving.MatchComputationFeature;

@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.css'],
})
export class GameTableComponent implements OnInit {

  @Input() participant: Participant;
  @Input() match: MatchReference;

  private computedStatistics: MatchComputationFeature;

  constructor(private gatewayService: GatewayService,
              private snackBar: MdSnackBar) {
  }

  ngOnInit() {
    const query: ComputationQuery = {
      matchID: this.match.id,
      region: this.participant.summoner.region.toString(),
      summonerID: this.participant.summoner.id,
    };
    this.gatewayService.getComputedStatistics(query).subscribe(
      (computedStatistics) => {
        console.log(computedStatistics);
        this.computedStatistics = computedStatistics
      },
      (error) => this.snackBar.open('[ERROR] Cannot retrieve computed stats of ' + this.participant.summoner.name + '.', 'Ok'),
    );
  }

}
