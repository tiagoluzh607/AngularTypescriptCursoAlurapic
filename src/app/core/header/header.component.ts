import { Component } from '@angular/core';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';
import { User } from '../user/user';

@Component({
    selector: 'ap-header',
    templateUrl: 'header.component.html'
})
export class HeaderComponent{

    user$: Observable<User>; //dolar é convencao para Observable // colocado o pipe no async para o proprio template fazer o subscribe

    constructor(userService: UserService){
        this.user$ = userService.getUser();
    }
}