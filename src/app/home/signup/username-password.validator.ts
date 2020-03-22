import { ValidatorFn, FormGroup } from "@angular/forms";

export const userNamePassword: ValidatorFn = (formGroup: FormGroup)=>{
    const userName = formGroup.get('userName').value;
    const password = formGroup.get('password').value;

    if(userName.trim()+password.trim()){ // caso nao for em branco
        return  userName == password ? {userNamePassword: true} : null // caso o usuario for igual a senha lanca erro
    }
    return null;
}