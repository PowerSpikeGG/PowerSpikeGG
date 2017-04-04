import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.css']
})
export class LocationPickerComponent implements OnInit {

  @Input() region: string;
  // TODO: output variable to search-bar when modified

  constructor() {
  }

  ngOnInit() {
  }

}
