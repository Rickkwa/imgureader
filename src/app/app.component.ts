import { Component } from "@angular/core";
import { NgModule } from "@angular/core";

import { ApiService } from "./api.service";
import { Chapter } from "./chapter";
import { Page } from "./page";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
})
export class AppComponent {
    title = "imgureader";
}
