import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  private displayMatchAnalysis: boolean;

  constructor() { }

  ngOnInit() {
    this.displayMatchAnalysis = false;
  }

  toggleMatchDisplay() {
    this.displayMatchAnalysis = !this.displayMatchAnalysis;
  }

}
