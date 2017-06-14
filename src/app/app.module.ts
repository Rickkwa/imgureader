import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ApiService } from './api.service';

import { AppRoutingModule } from './app-routing.module';
import { ReaderComponent } from './reader.component';
import { LandingComponent } from './landing.component';
import { AppComponent } from './app.component';
import { RangePipe } from './range.pipe';


@NgModule({
    declarations: [
        AppComponent,
        ReaderComponent,
        LandingComponent,
        RangePipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule
    ],
    providers: [
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
