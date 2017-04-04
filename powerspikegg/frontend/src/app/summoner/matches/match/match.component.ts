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
  participant: Participant;
  private displayMatchAnalysis: boolean;

  constructor() { }

  ngOnInit() {
    // TODO: generify this function
    this.participant = new Participant(this.match.detail.teams.map(team => team.participants.find(p => p.summoner.name === this.summoner.name)).filter(sum => !isUndefined(sum))[0]);
    this.displayMatchAnalysis = false;
  }

  toggleMatchDisplay() {
    this.displayMatchAnalysis = !this.displayMatchAnalysis;
  }

}
