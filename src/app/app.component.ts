import { Component } from '@angular/core';
import { NgModule } from '@angular/core';

import { ApiService } from './api.service';
import { Chapter } from './chapter';
import { Page } from './page';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [ ApiService ],
    styleUrls: ['./app.component.css'],
    host: { "(window:keydown)": "keyDownHandler($event)" }
})
export class AppComponent {
    title = 'imgureader';
    albumSearch: string;
    currentChapter: Chapter;
    currentPage: Page;
    currentPageIndex: number;

    constructor(private apiService: ApiService) { }

    albumSearchUpdate() {
        this.apiService.loadChapter(this.albumSearch.trim()).then(chapter => {
            this.currentPageIndex = 0;
            this.currentChapter = chapter;
            this.currentPage = chapter.getPage(this.currentPageIndex);
        });
    }

    nextPage(): void {
        if (this.currentPageIndex + 1 >= this.currentChapter.getNumPages())
            return;
        this.currentPageIndex += 1;
        this.currentPage = this.currentChapter.getPage(this.currentPageIndex);
        this.scrollReset();
    }

    prevPage(): void {
        if (this.currentPageIndex - 1 < 0)
            return;
        this.currentPageIndex -= 1;
        this.currentPage = this.currentChapter.getPage(this.currentPageIndex);
        this.scrollReset();
    }

    gotoPage(index: number): void {
        if (index < 0 || index >= this.currentChapter.getNumPages())
            return;
        this.currentPageIndex = index;
        this.currentPage = this.currentChapter.getPage(this.currentPageIndex);
        this.scrollReset();
    }

    scrollReset(): void {
        // TODO: animate this scroll
        document.getElementsByClassName("image-container")[0].scrollIntoView();
    }

    keyDownHandler(e: KeyboardEvent): void {
        if ("value" in document.activeElement) {
            console.log("This is editable");
            return;
        }
        if (e.keyCode == 37 || e.keyCode == 65) // left arrow (37) or A (65)
            this.prevPage();
        else if (e.keyCode == 39 || e.keyCode == 68) // right arrow (39) or D (68)
            this.nextPage();
    }
}
