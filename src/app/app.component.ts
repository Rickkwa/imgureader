import { Component } from '@angular/core';
import { NgModule } from '@angular/core';

import { ApiService } from './api.service';
import { Chapter } from './chapter';
import { Page } from './page';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [ ApiService ],
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'imgureader';
    albumSearch: string;
    currentChapter: Chapter;
    currentPage: Page;

    constructor(private apiService: ApiService) { }

    albumSearchOnChange() {
        // albumSearch = 'ojwXr'

        this.apiService.loadChapter(this.albumSearch).then(chapter => {
            this.currentChapter = chapter;
            this.currentPage = chapter.getPage(0);
        });
    }
}
