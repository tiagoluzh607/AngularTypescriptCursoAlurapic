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

    //Vamos enviar a foto para o servidor não em JSOn e sim em formData
    //o ervidor vai salvar a foto e disponibilizar ela atraves do endereco, localhost:3000/imgs/{nomefoto} - o nomeFoto quem irá devolver é servidor após processar a imagem
    upload(description: string, allowComments: boolean, file: File){
        const formData = new FormData();
        //preenchendo o formData com as propriedades
        formData.append('description',description);
        formData.append('allowComments',allowComments ? 'true': 'false');
        formData.append('imageFile', file);
        return this.http.post(API+'/photos/upload', formData);
    }

    findById(id: string){
        return this.http.get<Photo>(`${API}/photos/${id}`);
    }
}