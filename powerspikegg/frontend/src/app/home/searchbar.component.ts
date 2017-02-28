import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SummonerService } from '../services/summoner.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
})
export class SearchBarComponent implements OnInit {

  private summonerName: string;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  sendRequest() {
    if (this.summonerName) {
      console.log('[INFO] Summoner Name sent: ' + this.summonerName);
      this.router.navigateByUrl('/summoner/' + this.summonerName);
    }
  }

  errorHandler(error: any) {
    let logStr = '[ERROR] [QUERY SENDER SERVICE] ' + error;
    console.log(logStr);
  }

}
