import { Component, Input, OnInit } from '@angular/core';
import { fetcher, game } from '../../../../models/protos/bundle';
import Participant = game.leagueoflegends.Participant;
import PlayerStatistics = game.leagueoflegends.PlayerStatistics;
import AggregatedStatistics = fetcher.rds.AggregatedStatistics;

@Component({
  templateUrl: './analysis.component.html',
  selector: 'app-analysis',
  styleUrls: ['./analysis.component.css'],
})
export class AnalysisComponent implements OnInit {

  @Input() participant: Participant;

  constructor() {
  }

  ngOnInit() {

  }

}
