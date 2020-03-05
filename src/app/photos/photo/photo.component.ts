import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

const CLOUD = `${environment.ApiUrl}/imgs/`;

@Component({
    selector:'ap-photo', //ap de alurapic é uma boa pratica o nome do projeto ou empresa
    templateUrl: 'photo.component.html'
})
export class PhotoComponent{

    private _url = '';
    @Input() description = ''
    @Input() set url(url: string) {
        this.casoSejaUmaUrlDeImagemExternaAdicionaEndereco(url);
    }

    get url(){
        return this._url;
    }

    private casoSejaUmaUrlDeImagemExternaAdicionaEndereco(url: string){
        if(!url.startsWith('data')){ //se não tiver escrito data no comeco é uma url externa
            this._url = CLOUD + url;
        }else{
            this._url = url;
        }
    }
}