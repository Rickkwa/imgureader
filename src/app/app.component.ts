import { Component } from '@angular/core';

import { ApiService } from './api.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [ ApiService ],
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'imgureader';
    jsonResult: string;

    constructor(apiService: ApiService) {
        apiService.callApi('ojwXr').then(response => { this.jsonResult = response.title; console.log(response.pages); });
    }
}

