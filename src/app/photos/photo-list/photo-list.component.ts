import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Photo } from '../photo/photo';
import { debounceTime } from 'rxjs/operators'

@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit, OnDestroy {
  

  photos: Photo[] = [];
  filter: string = '';
  debounce: Subject<string> = new Subject<string>();


  constructor(
    private activatedRoute: ActivatedRoute
  ){}
  
  ngOnInit(): void {
    this.photos = this.activatedRoute.snapshot.data.photos; // conseguimos pegar os parâmetros passados na rota
    this.debounce
      .pipe(debounceTime(300)) //vai aguardar 300 miliseg se vier mais chamadas dentro desse periodo ele ignora
      .subscribe(filter => this.filter = filter);
    //this.debounce.next('f'); emite um valor
    //this.debounce.subscribe(value => alert(value)); escuta o valor emitido
  }

  ngOnDestroy(): void {
    this.debounce.unsubscribe(); //libera a memória do escutador
  }

  

}
