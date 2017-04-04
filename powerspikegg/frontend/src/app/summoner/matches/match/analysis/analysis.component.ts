import { Component, Input, OnInit } from '@angular/core';

import { fetcher, game } from '../../../../models/protos/bundle';

import Participant = game.leagueoflegends.Participant;
import PlayerStatistics = game.leagueoflegends.PlayerStatistics;
import AggregatedStatistics = fetcher.rds.AggregatedStatistics;

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css'],
})
export class AnalysisComponent implements OnInit {

  @Input() participant: Participant;

  constructor() {
  }

  ngOnInit() {

  }

}
