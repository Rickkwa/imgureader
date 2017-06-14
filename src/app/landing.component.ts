import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from './api.service';

@Component({
    templateUrl: './landing.component.html',
    providers: [ ApiService ],
    styleUrls: ['./landing.component.css']
})
export class LandingComponent {
    albumSearch: string = "";

    constructor(
        private apiService: ApiService,
        private router: Router
    ) { }

    albumSearchUpdate(): void {
        let hash: string = this.apiService.getHash(this.albumSearch);
        this.router.navigate(["/reader", hash]);
    }
}
