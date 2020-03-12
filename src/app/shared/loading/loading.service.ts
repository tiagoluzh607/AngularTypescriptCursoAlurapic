import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { LoadingType } from "./loading-type";
import { startWith } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class LoadingService{

    loadingSubject = new Subject<LoadingType>();

    getLoading(){
        return this.loadingSubject
            .asObservable()
            .pipe(startWith(LoadingType.STOPPED)); // diz que o observable iniciara lancando o valor stoped
    }

    start(){
        this.loadingSubject.next(LoadingType.LOADING);
    }

    stop(){
        this.loadingSubject.next(LoadingType.STOPPED);
    }
}