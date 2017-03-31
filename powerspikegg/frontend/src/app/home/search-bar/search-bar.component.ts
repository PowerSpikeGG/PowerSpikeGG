import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SummonerService } from '../../summoner/summoner.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  private summonerName: string;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  sendSummonerRequest() {
    if (this.summonerName) {
      console.log('[INFO] Summoner Name sent: ' + this.summonerName);
      this.router.navigateByUrl('/summoner/' + this.summonerName);
    }
  }

  static errorHandler(error: any) {
    let logStr = '[ERROR] [QUERY SENDER SERVICE] ' + error;
    console.log(logStr);
  }

}
