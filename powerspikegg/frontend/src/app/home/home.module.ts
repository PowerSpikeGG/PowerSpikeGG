import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

import { HomeComponent }   from './home.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { LocationPickerComponent } from './search-bar/location-picker/location-picker.component';

@NgModule({
  imports: [
    FormsModule,
    MaterialModule
  ],
  exports: [],
  declarations: [
    HomeComponent,
    SearchBarComponent,
    LocationPickerComponent
  ],
  providers: [],
})
export class HomeModule {
}
