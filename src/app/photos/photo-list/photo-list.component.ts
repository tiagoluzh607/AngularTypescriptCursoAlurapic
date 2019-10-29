import { Component, OnInit } from '@angular/core';
import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photos: Photo[] = [];
  filter: string = '';

  constructor(
    private photoService: PhotoService,
    private activatedRoute: ActivatedRoute
  ){}
  
  ngOnInit(): void {

    const userName: string = this.activatedRoute.snapshot.params.userName; //pega o parametro da rota 

    this.photoService
    .listFromUser(userName)
    .subscribe(photos => this.photos = photos);
  }

}