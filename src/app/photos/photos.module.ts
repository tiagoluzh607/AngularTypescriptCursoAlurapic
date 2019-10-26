import { NgModule } from '@angular/core';
import { PhotoComponent } from './photo/photo.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { PhotoListComponent } from './photo-list/photo-list.component';



@NgModule({
    declarations: [
        PhotoComponent, 
        PhotoListComponent
    ],
    imports: [
        HttpClientModule,
        CommonModule //é um import para que funcione as diretivas nesse modulo que esta separado de appModule
    ]
})
export class PhotosModule{}