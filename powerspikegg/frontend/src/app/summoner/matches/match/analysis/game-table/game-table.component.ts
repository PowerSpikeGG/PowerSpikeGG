import { Component, Input, OnInit } from '@angular/core';
import { GatewayService } from '../../../../../services/gateway.service';
import { game, serving } from '../../../../../models/protos/bundle';
import Participant = game.leagueoflegends.Participant;
import MatchReference = game.leagueoflegends.MatchReference;
import { MdSnackBar } from '@angular/material';
import Statistics = serving.Statistics;
import { ComputationQuery } from '../../../../../models/gateway-queries';

@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.css']
})
export class GameTableComponent implements OnInit {

  @Input() participant: Participant;
  @Input() match: MatchReference;

  private computedStatistics: Statistics;

  constructor(private gatewayService: GatewayService,
  private snackBar: MdSnackBar) {
  }

  ngOnInit() {
    const query: ComputationQuery = {
      matchID: this.match.id,
      summonerID: this.participant.summoner.id,
      region: this.participant.summoner.region.toString(),
    };
    this.gatewayService.getComputedStatistics(query).subscribe(
      (computedStatistics) => this.computedStatistics = computedStatistics,
      (error) => this.snackBar.open('[ERROR] Cannot retrieve aggregated stats of ' + this.participant.summoner.name + '.', 'Ok'),
    )

  }

}
