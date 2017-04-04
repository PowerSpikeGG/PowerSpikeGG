import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  private summonerName: string;
  private region: string;

  constructor(private router: Router) {
    this.region = "EUW" // TODO: remove this and link with location picker
  }

  ngOnInit() {
  }

  sendSummonerRequest() {
    if (this.summonerName) {
      this.router.navigateByUrl('/summoner/' + this.summonerName + '/' + this.region);
    }
  }

}
