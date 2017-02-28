import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

import { SummonerComponent }   from './summoner.component';
import { SpinnerComponent } from '../spinner/spinner.component';

@NgModule({
  imports: [
    FormsModule,
    MaterialModule
  ],
  exports: [],
  declarations: [
    SummonerComponent,
    SpinnerComponent
  ],
  providers: [],
})
export class SummonerModule {
}
