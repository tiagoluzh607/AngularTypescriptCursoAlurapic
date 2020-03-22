import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lowerCaseValidator } from '../../shared/validators/lower-case.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { NewUser } from './new-user';
import { SignUpService } from './signup.service';
import { Router } from '@angular/router';
import { PlatformDetectorService } from '../../core/platform-detector/platform-detector-service';
import { userNamePassword } from './username-password.validator';

@Component({
    templateUrl: './signup.component.html',
    providers: [UserNotTakenValidatorService]
})
export class SignUpComponent implements OnInit {

    signupForm: FormGroup;
    @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

    constructor(
        private formBuilder: FormBuilder,
        private userNotTakenValidatorService: UserNotTakenValidatorService,
        private signUpService: SignUpService,
        private router: Router,
        private platformDetectorService: PlatformDetectorService
    ) {

    }

    ngOnInit(): void {

        this.signupForm = this.formBuilder.group({
            email: ['', [
                Validators.required,
                Validators.email
            ]],
            fullName: ['', [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(40)
            ]],
            userName: ['', [ //(1?,2?,3?) 1? Valor Padrao do input, 2? Validador sincronos, 3? Validador Assincrono
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(30),
                lowerCaseValidator
            ],
                this.userNotTakenValidatorService.checkUserNameTaken()
            ],
            password: ['', [
                Validators.required,
                
                Validators.minLength(8),
                Validators.maxLength(18)
            ]],
        }, {
            validator: userNamePassword //faz validações crossfield ou seja entre campos do formulario
        });

        this.platformDetectorService.isPlatformBrowser() && // truque se for true executa 
        this.emailInput.nativeElement.focus(); //chama o focus do elemento
    }

    signup(){

        //só faz a submissão se o formulário estiver valido
        if(this.signupForm.valid && !this.signupForm.pending){

            const newUser = this.signupForm.getRawValue() as NewUser;
            this.signUpService
                .signup(newUser)
                .subscribe(()=>
                    this.router.navigate(['']),
                    err => console.log(err)
                )
        }

       
    }

}