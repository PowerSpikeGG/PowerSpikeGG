import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
      this.router.navigateByUrl('/summoner/' + this.summonerName);
    }
  }

}
