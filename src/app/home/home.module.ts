import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms'

import { SignInComponent } from './signin/signin.component';
import { CommonModule } from '@angular/common';
import { VMessageModule } from '../shared/vmessage/vmessage.module';
import { RouterModule } from '@angular/router';
import { SignUpComponent } from './signup/signup.component';
import { HomeComponent } from './home.component';


@NgModule({
    declarations: [
        SignInComponent, 
        SignUpComponent,
        HomeComponent
    ],
    imports: [
        CommonModule,
        FormsModule, //para colocar a tag form o angular usa esse como padrao a nao ser que usemos o ReactiveFormsModule
        ReactiveFormsModule,
        VMessageModule,
        RouterModule
    ]
})
export class HomeModule{

}