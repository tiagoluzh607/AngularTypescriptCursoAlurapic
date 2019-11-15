import { Injectable } from '@angular/core';
import { SignUpService } from './signup.service';
import { AbstractControl } from '@angular/forms';

import { debounceTime, switchMap, map, first } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserNotTakenValidatorService{
    constructor(private signUpService: SignUpService){
    }

    /** O metodo vai retornar uma funcao de validacao */
    checkUserNameTaken(){
        return (control: AbstractControl) => { //retorna null quando nao tiver problemas de validacao e retorna um objeto quando tiver problema de validacao
            return control
                .valueChanges
                .pipe(debounceTime(300)) //nao executar a cada digito e sim esperar 300 milisegundos apos digitacao
                .pipe(switchMap(userName=> //redireciona o fluxo do Observable para outro observable
                    this.signUpService.checkUserNameTaken(userName)
                ))
                .pipe(map(isTaken =>  //como o fluxo foi trocado temos acesso ao resultado do servico, porem vamos adaptar a resposta para a funcao de validacao 
                    isTaken?{userNameTaken: true}: null
                ))
                .pipe(first()); //força o observable ao completar pegando o primeiro valor
        }
    }
}