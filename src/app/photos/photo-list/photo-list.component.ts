import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {
  

  photos: Photo[] = [];
  filter: string = '';
  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';


  constructor(
    private photoService: PhotoService,
    private activatedRoute: ActivatedRoute
  ){}
  
  ngOnInit(): void {
    this.userName = this.activatedRoute.snapshot.params.userName; // pegando parametros da url
    this.photos = this.activatedRoute.snapshot.data.photos; // conseguimos pegar os parâmetros passados na rota
    
  }

  load(){
    this.photoService.listFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe(photos => {
        //this.photos.push(...photos);// o push nao funcionara pois o angular só detecta quando o valor da variavel e no caso do push o valor da variavel em si nao muda só é adicionado um novo objeto a lista
        //para adicionar mais fotos ... passar como parametro exemplo (1,2,3) quantos elements tiver ele vai passar
        this.filter = '';
        this.photos = this.photos.concat(photos); //retornara uma lista nova com os dois juntos
        if(!photos.length) this.hasMore = false; //quando nao tiver mais seta hasMore para false
      });
  }

  

}
