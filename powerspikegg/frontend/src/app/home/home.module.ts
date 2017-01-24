import {NgModule} from '@angular/core';

import {HomeComponent}   from './home.component';
import {SearchBarComponent} from "./searchbar.component";
import {LocationPickerComponent} from "./location-picker.component";
import {MaterialModule} from "@angular/material";

@NgModule({
  imports: [
    MaterialModule
  ],
  exports: [],
  declarations: [HomeComponent, SearchBarComponent, LocationPickerComponent],
  providers: [],
})
export class HomeModule {
}
