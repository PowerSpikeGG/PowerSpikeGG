import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import { MaterialModule } from '@angular/material';

import {AppComponent} from './app.component';

import {routing, appRoutingProviders} from './app.routing';
import {HomeComponent} from "./home/home.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {SearchBarComponent} from "./searchbar/searchbar.component";
import {LocationPickerComponent} from "./location-picker/location-picker.component";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        SearchBarComponent,
        PageNotFoundComponent,
        LocationPickerComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
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
