import { Pipe, PipeTransform } from '@angular/core';
import { Photo } from '../photo/photo';

@Pipe({
    name: 'filterByDescription' //nome do filtro
})
export class FilterByDescription implements PipeTransform {

    transform(photos: Photo[], descriptionQuery: string) { //tenho que retornar sempre o mesmo tipo da entrada do tubo no caso photos
        descriptionQuery =  descriptionQuery.trim().toLowerCase();

        if(descriptionQuery){ // se tem descriptionQuery filtra senão retorna a lista
            return photos.filter(photo => photo.description.trim().toLowerCase().includes(descriptionQuery));
        }else{
            return photos
        }
    }

}