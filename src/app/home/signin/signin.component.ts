import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit{


    loginForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router
    ){

    }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required], //deve ser o nome do input (?1, ?2, ?3) ?1- valor padrao do input
            password: ['', Validators.required]
        });
    }

    login(){
        const userName = this.loginForm.get('userName').value;
        const password = this.loginForm.get('password').value;

        this.authService
            .authenticate(userName, password)
            .subscribe(
                ()=>{
                    this.router.navigate(['user', userName]) //vai direcionar para /user/flavio
                },
                err => {
                    console.log(err);
                    this.loginForm.reset();
                    alert('Invalid UserName or Password');
                }
            )
    }
}