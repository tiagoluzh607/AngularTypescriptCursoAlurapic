import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Photo } from './photo';

const API = 'http://localhost:3000';

@Injectable({
    providedIn: 'root' //cria um servico para aplicação interira
})
export class PhotoService{
    constructor(private http: HttpClient){}

    listFromUser(userName: string){
        return this.http
            .get<Photo[]>(`${API}/${userName}/photos`);
    }

    //backeed esta preparado para http://localhost:3000/flavio/photos?page=2 receber parametro de paginação
    listFromUserPaginated(userName: string, page: number){
        const params = new HttpParams()
            .append('page', page.toString());
        return this.http
            .get<Photo[]>(`${API}/${userName}/photos`, {params});
    }
}