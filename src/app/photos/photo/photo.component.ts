import { Component, Input } from '@angular/core';

@Component({
    selector:'ap-photo', //ap de alurapic é uma boa pratica o nome do projeto ou empresa
    templateUrl: 'photo.component.html'
})
export class PhotoComponent{
    @Input() url = ''
    @Input() description = ''
}