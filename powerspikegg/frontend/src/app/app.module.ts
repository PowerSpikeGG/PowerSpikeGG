import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import { MaterialModule } from '@angular/material';

import {AppComponent} from './app.component';

import {routing, appRoutingProviders} from './app.routing';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {HomeModule} from "./home/home.module";

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        HomeModule,
        routing,
        MaterialModule.forRoot()
    ],
    providers: [
        appRoutingProviders
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
