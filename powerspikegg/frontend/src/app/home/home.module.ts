import {NgModule} from '@angular/core';

import {HomeComponent}   from './home.component';
import {SearchBarComponent} from "./searchbar.component";
import {LocationPickerComponent} from "./location-picker.component";
import {MaterialModule} from "@angular/material";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    FormsModule,
    MaterialModule
  ],
  exports: [],
  declarations: [HomeComponent, SearchBarComponent, LocationPickerComponent],
  providers: [],
})
export class HomeModule {
}
