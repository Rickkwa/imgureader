import { Injectable } from "@angular/core";

import { Chapter } from "./chapter";

@Injectable()
export class ChapterHistoryService {
    private history: ChapterHistoryEntry[]; // front of array is most recent
    private readonly maxSize: number = 30;

    constructor() {
        if (localStorage.getItem("imgureaderHistory") != null)
            this.history = JSON.parse(localStorage.getItem("imgureaderHistory"));
        else {
            this.history = new Array<ChapterHistoryEntry>();
            localStorage.setItem("imgureaderHistory", JSON.stringify([]));
        }
    }

    add(ch: Chapter): void {
        const index: number = this.indexOf(ch.hash);
        if (index !== -1)
            this.history.splice(index, 1);
        else
            while (this.getSize() >= this.maxSize)
                this.history.pop()

        this.history.unshift(new ChapterHistoryEntry(ch, new Date()));
        localStorage.setItem("imgureaderHistory", JSON.stringify(this.history));
    }

    getHistory(): ChapterHistoryEntry[] {
        return JSON.parse(JSON.stringify(this.history));
    }

    getFromMostRecent(index: number): ChapterHistoryEntry {
        if (index < 0 || index >= this.getSize())
            return null;
        return this.history[index];
    }

    getFromLeastRecent(index: number): ChapterHistoryEntry {
        if (index < 0 || index >= this.getSize())
            return null;
        return this.history[this.getSize() - 1 - index];
    }

    getSize(): number {
        return Math.min(this.maxSize, this.history.length);
    }

    indexOf(hash: string): number {
        // Return an index from most recent (ie 0 is most recent). Return -1 if the Chapter is not in the history.
        for (let i = 0; i < this.getSize(); i++)
            if (this.getFromMostRecent(i).chapter.hash === hash)
                return i;
        return -1;
    }
}

class ChapterHistoryEntry {
    chapter: Chapter;
    dateAccessed: Date;

    constructor(chapter: Chapter, date: Date) {
        this.chapter = chapter;
        this.dateAccessed = date;
    }
}
