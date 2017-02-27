import {NgModule} from '@angular/core';

import {SummonerComponent}   from './summoner.component';
import {MaterialModule} from "@angular/material";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    FormsModule,
    MaterialModule
  ],
  exports: [],
  declarations: [SummonerComponent],
  providers: [],
})
export class SummonerModule {
}
