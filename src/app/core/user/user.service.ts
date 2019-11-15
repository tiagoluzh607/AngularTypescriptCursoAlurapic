import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import * as jtw_decode from 'jwt-decode';
import { Subject, BehaviorSubject } from 'rxjs';
import { User } from './user';

@Injectable({
    providedIn: 'root'
})
export class UserService{

    private userSubject = new BehaviorSubject<User>(null); //emissor de mensagem, o behavior subject segura nele sempre o ultimo next até que alguem consuma, mas de cara ele jah deve emitir um valor que por padrao colocamos null 
    private userName: string = null;

    constructor(private tokenService: TokenService){

        tokenService.hasToken() && //se o usuario fechar a aplicacao e abrir novamente o construtor será chamado e vera se jah nao existe o token no banco
            this.decodeAndNotify();
    }

    setToken(token){
        this.tokenService.setToken(token);
        this.decodeAndNotify();
    }

    decodeAndNotify(){
       const token = this.tokenService.getToken();
       const user = jtw_decode(token) as User;
       this.userName = user.name;
       this.userSubject.next(user); //emite o objeto usuario
    }

    getUser(){
        return this.userSubject.asObservable();
    }

    getUserName(){
        return this.userName;
    }

    logout(){
        this.tokenService.removeToken();
        this.userSubject.next(null);
    }
    
    isLogged(){
        return this.tokenService.hasToken();
    }
}