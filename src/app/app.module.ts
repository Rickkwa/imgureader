import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ApiService } from './api.service';

import { AppComponent } from './app.component';
import { RangePipe } from './range.pipe';

@NgModule({
    declarations: [
        AppComponent,
        RangePipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
