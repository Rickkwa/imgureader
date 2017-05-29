import { Page } from './page';

// An ordered list of Pages with some meta data
export class Chapter {
    title: string;
    link: string;
    nsfw: boolean;
    imagesCount: number;
    datetime: Date;
    pages: Page[];

    constructor(title, link, nsfw, imagesCount, datetime) {
        this.title = title;
        this.link = link;
        this.nsfw = nsfw;
        this.imagesCount = imagesCount;
        this.datetime = datetime;
        this.pages = [];
    }

    getTitle() {
        return this.title;
    }

    addPage(newPage: Page): void {
        this.pages.push(newPage);
    }

    getPage(index: number) {
        if (index < 0 || index >= this.imagesCount)
            return null;
        return this.pages[index];
    }
}
