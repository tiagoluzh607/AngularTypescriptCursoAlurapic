import { AbstractControl } from '@angular/forms';
/**
 * retorna null caso nao existe nenhum erro de validacao
 * caso exista algum erro de validacao retorna um objeto { nameDaValidacao: true}
 * @param control 
 */
export function lowerCaseValidator(control: AbstractControl){ //recebe o input
    
    let value = control.value;

    if(value.trim() && !/^[a-z0-9_\-]+$/.test(value)){
        return { lowerCase: true}
    }
    return null;
}