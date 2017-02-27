import { Component, OnInit } from '@angular/core';
import { QuerySenderService } from '../services/query-sender.service';
import {Router} from "@angular/router";
import {summonerQuery} from "../models/summonerQuery";


@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
})
export class SearchBarComponent implements OnInit {

  private summonerQuery: string;

  constructor(private querySender: QuerySenderService,
              private router: Router) {
  }

  ngOnInit() {
  }

  sendRequest() {
    if (this.summonerQuery) {
      console.log("[INFO] Summoner Query sent: " + this.summonerQuery);
      this.router.navigateByUrl('/summoner');
    }
  }

  errorHandler(error: any) {
    let logStr = '[ERROR] [QUERY SENDER SERVICE] ' + error;
    console.log(logStr);
  }

}
