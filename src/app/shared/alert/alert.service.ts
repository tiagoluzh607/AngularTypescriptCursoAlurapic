import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { Alert, AlertType } from "./alert";
import { Router, NavigationStart } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AlertService{

    alertSubject: Subject<Alert> = new Subject<Alert>();
    keepAfterRouteChange = false;

    constructor(router: Router){
        router.events.subscribe( //pega os eventos da rota
            event=>{
                if(event instanceof NavigationStart){ //caso outra rota tenha iniciado
                    if(this.keepAfterRouteChange){
                        this.keepAfterRouteChange = false;
                    }else{
                        this.clear();
                    }
                }
            },
            err=>console.error(err)
        );
    }

    success(message: string, keepAfterRouteChange: boolean = false){
        this.alert(AlertType.SUCCESS, message, keepAfterRouteChange);
    }

    warning(message: string, keepAfterRouteChange: boolean = false){
        this.alert(AlertType.WARNING, message, keepAfterRouteChange);
    }

    danger(message: string, keepAfterRouteChange: boolean = false){
        this.alert(AlertType.DANGER, message, keepAfterRouteChange);
    }

    info(message: string, keepAfterRouteChange: boolean = false){
        this.alert(AlertType.INFO, message, keepAfterRouteChange);
    }

    private alert(alertType: AlertType, message: string, keepAfterRouteChange: boolean){
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.alertSubject.next(new Alert(alertType, message));
    }

    getAlert(): Observable<Alert>{
        return this.alertSubject.asObservable();
    }

    clear(){
       this.alertSubject.next(null);
    }
}