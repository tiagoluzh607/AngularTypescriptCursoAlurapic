import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { PlatformDetectorService } from '../../core/platform-detector/platform-detector-service';

@Component({
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit{


    loginForm: FormGroup;
    @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>; //busca um elemento com um template view

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private platformDetectorService: PlatformDetectorService
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

                    this.platformDetectorService.isPlatformBrowser() && // truque se for true executa 
                        this.userNameInput.nativeElement.focus(); //chama o focus do elemento
                    alert('Invalid UserName or Password');
                }
            )
    }
}