import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ApiService } from './api.service';
import { Chapter } from './chapter';
import { Page } from './page';

@Component({
    templateUrl: './reader.component.html',
    providers: [ ApiService ],
    styleUrls: ['./reader.component.css'],
    host: { "(window:keydown)": "keyDownHandler($event)" }
})
export class ReaderComponent implements OnInit {
    albumSearch: string;
    currentChapter: Chapter;
    currentPage: Page;
    currentPageIndex: number;

    constructor(
        private apiService: ApiService, 
        private route: ActivatedRoute, 
        private router: Router
    ) { }

    ngOnInit() {
        // console.log("albumhash", this.route.snapshot.params['albumhash']);
        // console.log("page", this.route.snapshot.params['pagenum']);

        this.route.params.subscribe((params) => {
            this.onUrlChange(params["albumhash"], +params["pagenum"]);
        });
        // this.router.navigate(["reader", "ojwXr", "page", 20]);
    }

    onUrlChange(albumHash: string, pageNum: number) {
        console.log(albumHash, pageNum);
    }

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
        this.scrollToTarget((<HTMLElement> document.getElementsByClassName("image-container")[0]).offsetTop, 150);
    }

    keyDownHandler(e: KeyboardEvent): void {
        if ("value" in document.activeElement) {
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

    scrollToTarget(targetY: number, scrollDuration: number): void {
        let distToGo; 
        let direction = window.scrollY > targetY ? -1 : 1; // negative means scroll up, positive means scroll down
        let intervalLength = 20;

        let stepsLeft = scrollDuration / intervalLength;
        let scrollInterval = setInterval(() => {
            distToGo = Math.abs(window.scrollY - targetY);
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
