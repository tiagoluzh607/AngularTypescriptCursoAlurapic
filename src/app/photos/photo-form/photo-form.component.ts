import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhotoService } from '../photo/photo.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { UserService } from 'src/app/core/user/user.service';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  photoForm:FormGroup;
  file: File;
  preview: string;

  constructor(
    private formBuilder: FormBuilder, 
    private photoService: PhotoService,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService
  ) { 

  }

  ngOnInit() {
    this.photoForm = this.formBuilder.group({
      file: [null],
      description: ['', Validators.maxLength(300)],
      allowComments: [true]
    })
  }

  upload(){
    const description = this.photoForm.get('description').value;
    const allowComments = this.photoForm.get('allowComments').value;
    //console.log(this.file);

    this.photoService.upload(description, allowComments, this.file)
      .subscribe(
        ()=>{
          this.alertService.success('Upload Complete',true);
          this.router.navigate(['/user', this.userService.getUserName()]);
        },
        ()=>{}
      )
  }

  /**
   * Metodo que converte URI em base 64
   * @param file
   */
  handleFile(file: File){
    this.file = file;
    const reader = new FileReader();
    reader.onload = (event: any) => this.preview = event.target.result; // passa uma funcao calback ao terminar de carregar o metodo read as data URL
    reader.readAsDataURL(file);
  }

}
