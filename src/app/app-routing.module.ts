import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { ReaderComponent } from './reader.component';
import { LandingComponent } from './landing.component';

// import { PageNotFoundComponent } from './not-found.component';

const appRoutes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'reader/:albumhash/page/:pagenum', component: ReaderComponent },
    { path: 'reader/:albumhash', redirectTo: 'reader/:albumhash/page/1', pathMatch: 'full' }
];
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
