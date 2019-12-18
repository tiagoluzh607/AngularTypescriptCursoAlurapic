import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { PhotoComment } from "../../photo/photo-comment";
import { PhotoService } from "../../photo/photo.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { switchMap, tap } from 'rxjs/operators';

@Component({
    selector: 'ap-photo-comments',
    templateUrl: './photo-comments.component.html'
})
export class PhotoCommentsComponent implements OnInit {

    @Input() photoId: number;
    commentForm: FormGroup;

    comments$: Observable<PhotoComment[]>;

    constructor(
        private photoService: PhotoService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.comments$ = this.photoService.getComments(this.photoId);

        this.commentForm = this.formBuilder.group({
            comment: ['', Validators.maxLength(300)]
        })

    }

    save() {
        const comment = this.commentForm.get('comment').value as string;
        this.comments$ = this.photoService
            .addComment(this.photoId, comment)
            .pipe(switchMap(() => this.photoService.getComments(this.photoId))) // Switch map autera o fluxo do Observable para um outro Observable, como o fluxo foi alterado agora o ultimo Observale do Switch é retornado
            .pipe(tap(() => { // tap executa um codigozin antes de retornar o observable, um tapinha antes do subscribe
                this.commentForm.reset();
            }))




    }
}