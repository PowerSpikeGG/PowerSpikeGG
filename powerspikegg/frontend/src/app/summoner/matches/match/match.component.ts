import { Component, Input, OnInit } from '@angular/core';
import { game } from '../../../models/protos/bundle';
import MatchReference = game.leagueoflegends.MatchReference;
import Summoner = game.leagueoflegends.Summoner;
import { isUndefined } from 'util';
import Participant = game.leagueoflegends.Participant;

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  @Input() match: MatchReference;
  @Input() summoner: Summoner;
  private participant: Participant;
  private kdaRatio: number;
  private displayMatchAnalysis: boolean;
  private victory: boolean;

  constructor() { }

  ngOnInit() {
    // TODO: generify this function
    this.participant = new Participant(this.match.detail.teams.map(team => team.participants.find(p => p.summoner.name === this.summoner.name)).filter(sum => !isUndefined(sum))[0]);
    this.kdaRatio = (this.participant.statistics.kills + this.participant.statistics.assists / 2) / this.participant.statistics.deaths;
    this.victory = this.match.detail.teams[0].participants.filter(p => p.summoner.name === this.summoner.name).length != 0 ? this.match.detail.teams[0].winner : !this.match.detail.teams[0].winner;
    this.displayMatchAnalysis = false;
  }

  toggleMatchDisplay() {
    this.displayMatchAnalysis = !this.displayMatchAnalysis;
  }

  getKdaRatioColor() {
    let kdaRatioColor;
    if (this.kdaRatio <= 0.5) {
      kdaRatioColor = 'ratio-bad';
    } else if (0.5 < this.kdaRatio && this.kdaRatio <= 1) {
      kdaRatioColor = 'ratio-low';
    } else if (1 < this.kdaRatio && this.kdaRatio <= 1.5) {
      kdaRatioColor = 'ratio-ok';
    } else if (1.5 < this.kdaRatio && this.kdaRatio <= 2.5 ) {
      kdaRatioColor = 'ratio-good';
    } else {
      kdaRatioColor = 'ratio-great';
    }
    return(kdaRatioColor);
  }

}
