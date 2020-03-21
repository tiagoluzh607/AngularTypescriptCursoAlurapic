import { ErrorHandler, Injectable, Injector } from "@angular/core";
import * as StackTrace from 'stacktrace-js';
import { LocationStrategy, PathLocationStrategy } from "@angular/common";
import { UserService } from "src/app/core/user/user.service";
import { ServerLogService } from "./server-log-service";
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler{

    constructor(private injector: Injector){

    }
    
    handleError(error: any): void {
        console.log('passei pelo handler');

        const location = this.injector.get(LocationStrategy); // captura a injeção de dependencia sobre demana atraves do injector
        const userService = this.injector.get(UserService); // captura a injeção de dependencia sobre demana atraves do injector
        const serverLogService = this.injector.get(ServerLogService);
        const router = this.injector.get(Router);

        const url: string = (location instanceof PathLocationStrategy) ? location.path+'': '';


        const message = error.message?error.message:error.toString();
        
        //if(environment.production){ //joga para tela de erro somente em produção
            router.navigate(['/error']);
        //}

        StackTrace
            .fromError(error)
            .then(stackFrames =>{
                const stackAsString = stackFrames.map(sf => sf.toString()).join('\n');
                console.log(message);
                console.log(stackAsString);
                console.log(url);

                serverLogService.log({
                    message, 
                    url, 
                    userName: userService.getUserName(), 
                    stack: stackAsString
                }).subscribe(()=>{
                    console.log('Error logged on server'),
                    err=> { console.log(err, 'Fail to send error log to server')}
                })

            })
    }
}