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
    pageImages: HTMLImageElement[];

    albumHash: string;
    pageIndex: number;

    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.route.params.subscribe((params) => {
            if (params["albumhash"] && params["pagenum"])
                this.onUrlChange(params["albumhash"], +params["pagenum"]);
        });
    }

    onUrlChange(albumHash: string, pageNum: number) {
        // TODO: verify hash works?
        // TODO/TOFIX: When gotoPage runs, it sets the current page and changes URL. Since URL changes, this function gets called
        //             and it ends up calling gotoPage again. But since it goes to the same page, it won't run infinitely... but it
        //             still ends up running twice which is redundant.\

        let newChapter: boolean = this.albumHash != albumHash;
        this.albumHash = albumHash;
        this.pageIndex = pageNum - 1;

        if (!this.currentChapter || newChapter) {
            this.apiService.loadChapter(this.albumHash.trim()).then(chapter => {
                this.currentChapter = chapter;
                this.pageImages = new Array<HTMLImageElement>();
                this.gotoPage(this.pageIndex);
            });
        }
        else {
            this.gotoPage(this.pageIndex);
        }
    }

    albumSearchUpdate() {
        let hash: string = this.apiService.getHash(this.albumSearch.trim());
        this.router.navigate(['/reader', hash]);
    }

    nextPage(): void {
        if (this.currentPageIndex + 1 >= this.currentChapter.getNumPages())
            // TODO: Some user feedback that this is the last page
            return;

        this.currentPageIndex += 1;
        this.gotoPage(this.currentPageIndex);
        this.router.navigate(['/reader', this.albumHash, 'page', this.currentPageIndex + 1]);
    }

    prevPage(): void {
        if (this.currentPageIndex - 1 < 0)
            // TODO: Some user feedback that this is the first page
            return;

        this.currentPageIndex -= 1;
        this.gotoPage(this.currentPageIndex);
        this.router.navigate(['/reader', this.albumHash, 'page', this.currentPageIndex + 1]);
    }

    getImage(src: string): HTMLImageElement {
        let result = new Image();
        result.src = src;
        return result;
    }

    gotoPage(index: string | number): void {
        index = parseInt(index + "");
        if (index < 0 || index >= this.currentChapter.getNumPages())
            return;
        this.currentPageIndex = index;
        this.currentPage = this.currentChapter.getPage(this.currentPageIndex);
        this.router.navigate(['/reader', this.albumHash, 'page', this.currentPageIndex + 1]);

        // Preload images for neighboring pages
        this.pageImages[index] = this.getImage(this.currentPage.getLink());
        if (index - 1 >= 0)
            this.pageImages[index - 1] = this.getImage(this.currentChapter.getPage(index - 1).getLink());
        if (index + 1 < this.currentChapter.getNumPages())
            this.pageImages[index + 1] = this.getImage(this.currentChapter.getPage(index + 1).getLink());

        this.scrollReset();
    }

    scrollReset(): void {
        this.scrollToTarget((<HTMLElement> document.getElementsByClassName("reader-container")[0]).offsetTop, 150);
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
