import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { ReaderComponent } from './reader.component';

// import { PageNotFoundComponent } from './not-found.component';

const appRoutes: Routes = [
    // { path: 'crisis-center', component: CrisisListComponent },
    // { path: 'heroes',        component: HeroListComponent },
    // { path: '',   redirectTo: '/heroes', pathMatch: 'full' },
    // { path: '**', component: PageNotFoundComponent }
    { path: '', component: ReaderComponent },
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
