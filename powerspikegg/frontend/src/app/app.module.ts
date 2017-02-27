import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routing';
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { HomeModule } from "./home/home.module";
import { NavbarComponent } from "./navbar/navbar.component";
import { SummonerModule } from "./summoner/summoner.module";

import { QuerySenderService } from './services/query-sender.service';


@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        NavbarComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        MaterialModule.forRoot(),
        HomeModule,
        SummonerModule
    ],
    providers: [
        appRoutingProviders,
        QuerySenderService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
