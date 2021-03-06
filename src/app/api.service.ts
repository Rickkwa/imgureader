import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/toPromise";
import { environment } from "../environments/environment";

import { Chapter } from "./chapter";
import { Page } from "./page";

@Injectable()
export class ApiService {
    private clientId: string;
    private baseUrl: string;

    constructor(private http: Http) {
        this.baseUrl = "https://api.imgur.com/3/album/";
        this.clientId = environment.clientId;
    }

    callApi(hash: string): Promise<Chapter> {
        const headers = new Headers({
            "authorization": "Client-ID " + this.clientId
        });

        return this.http.get(this.baseUrl + hash, { headers: headers })
            .toPromise()
            .then(response => this.parseChapter(response.json().data))
            .catch(this.handleHttpError);
    }

    handleHttpError(error: any): Promise<any> {
        console.error("Error calling imgur api");
        return Promise.reject(error.message || error);
    }

    loadChapter(value: string): Promise<Chapter> {
        const hash: string = this.getHash(value);
        return this.callApi(hash);
    }

    getHash(s: string): string {
        s = s.trim().replace(new RegExp("^http(s)?://(www\.)?imgur\.com/(a|gallery)/", "g"), "");
        return s;
    }

    parseChapter(obj: any): Chapter {
        // Parse the json returned from the API to return a Chapter object.
        const date: Date = new Date(0);
        date.setUTCSeconds(obj.datetime);

        const result: Chapter = new Chapter(obj.id, obj.title, obj.link, obj.nsfw, obj.images_count, date);
        for (const image of obj.images)
            result.addPage(new Page(image.id, image.link, image.size, image.width, image.height));

        return result;
    }

    parsePage(json: string): Page {
        // Parse the json relating to pages from the APi to return a Page object.
        return null;
    }
}
