import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  @Output() onFocusSearch = new EventEmitter<boolean>();
  private summonerName: string;
  private region: string;
  private focusSearch: boolean;

  constructor(private router: Router) {
    this.region = "EUW" // TODO: remove this and link with location picker
  }

  ngOnInit() {
    this.focusSearch = false;
  }

  sendSummonerRequest() {
    if (this.summonerName) {
      this.router.navigateByUrl('/summoner/' + this.summonerName + '/' + this.region);
    }
  }

  toggleSearchFocus() {
    this.focusSearch = !this.focusSearch;
    this.onFocusSearch.emit(this.focusSearch);
  }

}
