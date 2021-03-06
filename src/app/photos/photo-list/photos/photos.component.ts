import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Photo } from '../../photo/photo';

@Component({
  selector: 'ap-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnChanges {
  

  @Input() photos: Photo[] = [];
  rows: any[] = [];
  constructor() { }

  ngOnInit() {
    this.rows = this.groupColumns(this.photos);
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.photos){ //componente changes diz para nós se uma propriedade mudou caso exista quer dizer que mudou
      this.rows = this.groupColumns(this.photos);
    }
  }

  groupColumns(photos: Photo[]): any[] {
    const newRows = [];
    for(let index = 0; index < photos.length; index+=3){
      newRows.push(photos.slice(index, index+3));
    }
    return newRows;
  }

}
