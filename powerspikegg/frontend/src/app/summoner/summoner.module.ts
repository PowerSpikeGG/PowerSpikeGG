import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';

import { SummonerComponent }   from './summoner.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { SideNavComponent } from './sidenav/sidenav.component';
import { MatchesComponent } from './matches/matches.component';
import { AnalysisComponent } from './matches/match/analysis/analysis.component';
import { MatchComponent } from './matches/match/match.component';
import { GatewayService } from 'app/services/gateway.service';
import { MatchDurationPipe } from './matches/match/match-duration.pipe';
import { RadarChartComponent } from './matches/match/analysis/radar-chart/radar-chart.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    ChartsModule,
  ],
  exports: [],
  declarations: [
    SummonerComponent,
    SpinnerComponent,
    SideNavComponent,
    MatchesComponent,
    AnalysisComponent,
    MatchComponent,
    MatchDurationPipe,
    RadarChartComponent,
  ],
  providers: [GatewayService],
})
export class SummonerModule {
}
