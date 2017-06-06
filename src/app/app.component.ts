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
            // TODO: Some user feedback that this is the last page
            return;
        this.currentPageIndex += 1;
        this.currentPage = this.currentChapter.getPage(this.currentPageIndex);
        this.scrollReset();
    }

    prevPage(): void {
        if (this.currentPageIndex - 1 < 0)
            // TODO: Some user feedback that this is the first page
            return;
        this.currentPageIndex -= 1;
        this.currentPage = this.currentChapter.getPage(this.currentPageIndex);
        this.scrollReset();
    }

    gotoPage(index: string | number): void {
        index = parseInt(index + "");
        if (index < 0 || index >= this.currentChapter.getNumPages())
            return;
        this.currentPageIndex = index;
        this.currentPage = this.currentChapter.getPage(this.currentPageIndex);
        this.scrollReset();
    }

    scrollReset(): void {
        // TODO: animate this scroll
        // document.getElementsByClassName("image-container")[0].scrollIntoView();

        // this.scrollToTopElement(document.getElementsByClassName("image-container")[0], 300);
        this.scrollToTop(document.getElementsByClassName("image-container")[0], 300);
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
        else if (e.keyCode == 83) // S (83)
            window.scrollBy(0, 40);
        else if (e.keyCode == 87) // W (87)
            window.scrollBy(0, -40);
    }

    // https://stackoverflow.com/a/24559613/2079781
    // scrollToTopElement(el, scrollDuration) {
    //     var cosParameter = window.scrollY / 2,
    //         scrollCount = 0,
    //         oldTimestamp = performance.now();
    //     function step(newTimestamp) {
    //         scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));
    //         let exit = scrollCount >= Math.PI || window.scrollY - el.offsetTop <= 0;
    //         if (exit) {
    //             window.scrollTo(0, el.offsetTop);
    //             return;
    //         }
    //         window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)));
    //         oldTimestamp = newTimestamp;
    //         window.requestAnimationFrame(step);
    //     }
    //     window.requestAnimationFrame(step);
    // }

    // scrollToTop(el, scrollDuration) {
    //     var scrollStep = -(window.scrollY - el.offsetTop) / (scrollDuration / 10),
    //     scrollInterval = setInterval(() => {
    //         if ( window.scrollY > el.offsetTop ) {
    //             window.scrollBy(0, scrollStep);
    //         }
    //         else {
    //             console.log(window.scrollY, el.offsetTop);
    //             clearInterval(scrollInterval); 
    //         }
    //     }, 20);
    // }

    scrollToTop(el, scrollDuration) {
        let distToGo; 
        let direction = window.scrollY > el.offsetTop ? -1 : 1; // negative means scroll up, positive means scroll down
        let intervalLength = 20;

        let stepsLeft = scrollDuration / intervalLength;
        let scrollInterval = setInterval(() => {
            distToGo = Math.abs(window.scrollY - el.offsetTop);
            if (distToGo <= 0) {
                clearInterval(scrollInterval);
                return;
            }
            let step = Math.min(distToGo, distToGo / stepsLeft);
            window.scrollBy(0, direction * step);
            stepsLeft -= 1;
        }, intervalLength);
    }
}
