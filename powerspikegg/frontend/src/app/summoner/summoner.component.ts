import { Component, OnInit } from '@angular/core';

import { SummonerService } from './summoner.service';
import { SummonerData } from '../models/summonerData';

@Component({
  selector: 'app-summoner',
  templateUrl: './summoner.component.html',
})
export class SummonerComponent implements OnInit {

  private showSpinner: boolean;

  constructor() {
  }

  ngOnInit() {
    this.showSpinner = true;
  }

}
