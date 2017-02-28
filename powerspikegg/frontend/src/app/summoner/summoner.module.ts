import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { SummonerComponent }   from './summoner.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { SummonerService } from './summoner.service';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule
  ],
  exports: [],
  declarations: [
    SummonerComponent,
    SpinnerComponent
  ],
  providers: [SummonerService],
})
export class SummonerModule {
}
