import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private logoState: boolean;

  constructor() {
  }

  ngOnInit() {
    this.logoState = false;
  }

  onFocusSearch(focusSearch: boolean) {
    this.logoState = focusSearch;
  }

  toggleLogoState() {
    this.logoState = !this.logoState;
  }

}
