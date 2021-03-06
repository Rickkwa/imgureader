import { Component } from "@angular/core";
import { NgModule } from "@angular/core";
import { Router } from "@angular/router";

import { ApiService } from "./api.service";
import { ChapterHistoryService } from "./chapter-history.service";

@Component({
    templateUrl: "./landing.component.html",
    providers: [ ApiService, ChapterHistoryService ],
    styleUrls: ["./landing.component.css"]
})
export class LandingComponent {
    albumSearch = "";

    constructor(
        private apiService: ApiService,
        public historyService: ChapterHistoryService,
        private router: Router
    ) { }

    albumSearchUpdate(): void {
        const hash: string = this.apiService.getHash(this.albumSearch);
        this.router.navigate(["/reader", hash]);
    }
}
