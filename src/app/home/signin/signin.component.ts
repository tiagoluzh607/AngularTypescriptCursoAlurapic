import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit{


    loginForm: FormGroup;

    constructor(private formBuilder: FormBuilder){

    }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required], //deve ser o nome do input (?1, ?2, ?3) ?1- valor padrao do input
            password: ['', Validators.required]
        })
    }
}