import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

const API = 'http://localhost:3000';

@Injectable({
    providedIn: 'root' //cria um servico para aplicação interira
})
export class PhotoService{
    constructor(private http: HttpClient){}

    listFromUser(userName: string){
        return this.http
            .get<Object[]>(`${API}/${userName}/photos`);
    }
}