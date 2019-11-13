import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms'

import { SignInComponent } from './signin/signin.component';
import { CommonModule } from '@angular/common';
import { VMessageModule } from '../shared/vmessage/vmessage.module';


@NgModule({
    declarations: [SignInComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        VMessageModule
    ]
})
export class HomeModule{

}