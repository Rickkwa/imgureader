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
    currentPageIndex: number;

    constructor(private apiService: ApiService) { }

    albumSearchOnChange() {
        this.apiService.loadChapter(this.albumSearch).then(chapter => {
            this.currentPageIndex = 0;
            this.currentChapter = chapter;
            this.currentPage = chapter.getPage(this.currentPageIndex);
        });
    }

    nextPage(): void {
        // TODO: handle the case if currentPageIndex is out of range then don't do anything
        this.currentPageIndex += 1;
        this.currentPage = this.currentChapter.getPage(this.currentPageIndex);
    }

    prevPage(): void {
        // TODO: handle the case if currentPageIndex is out of range then don't do anything
        this.currentPageIndex -= 1;
        this.currentPage = this.currentChapter.getPage(this.currentPageIndex);
    }

    gotoPage(index: number): void {
        // TODO: handle the case if currentPageIndex is out of range then don't do anything
        this.currentPageIndex = index;
        this.currentPage = this.currentChapter.getPage(this.currentPageIndex);
    }
}
