import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { NotFoundComponent } from './erros/not-found/not-found.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';
import { AuthGuard } from './core/auth/auth.guard';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full', //quando for exatamente  a raiz,
        redirectTo: 'home'
    },
    {
        path: 'home',
        loadChildren: './home/home.module#HomeModule'
    },
    { 
        path: 'user/:userName', 
        component: PhotoListComponent,
        resolve:{
            photos: PhotoListResolver //temos um resolver que irá mandar os dados ao resolver o component
        }
    },
    { path: 'p/add', component: PhotoFormComponent },
    { path: '**', component: NotFoundComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {useHash: true})
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule{}