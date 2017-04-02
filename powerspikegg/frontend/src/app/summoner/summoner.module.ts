import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { SummonerComponent }   from './summoner.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { SummonerService } from './summoner.service';
import { SideNavComponent } from './sidenav/sidenav.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatchesComponent } from './matches/matches.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [],
  declarations: [
    SummonerComponent,
    SpinnerComponent,
    SideNavComponent,
    MatchesComponent
  ],
  providers: [SummonerService],
})
export class SummonerModule {
}
