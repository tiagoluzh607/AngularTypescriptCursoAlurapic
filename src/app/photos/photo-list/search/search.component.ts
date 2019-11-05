import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators'


@Component({
    selector: 'ap-search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit,OnDestroy{

    @Output() onTyping = new EventEmitter<string>(); //nome do evento personalizado que emite uma string
    debounce: Subject<string> = new Subject<string>();



    ngOnInit(){
        this.debounce
          .pipe(debounceTime(300)) //vai aguardar 300 miliseg se vier mais chamadas dentro desse periodo ele ignora
          .subscribe(filter => this.onTyping.emit(filter)) //passa o valor do filtro para o onTyping
        //this.debounce.next('f'); emite um valor
        //this.debounce.subscribe(value => alert(value)); escuta o valor emitido
    }

    ngOnDestroy(): void {
        this.debounce.unsubscribe(); //libera a memória do escutador
    }
}


