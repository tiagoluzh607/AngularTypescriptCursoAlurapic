import { Component } from '@angular/core';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';
import { User } from '../user/user';
import { Router } from '@angular/router';

@Component({
    selector: 'ap-header',
    templateUrl: 'header.component.html'
})
export class HeaderComponent{

    user$: Observable<User>; //dolar é convencao para Observable // colocado o pipe no async para o proprio template fazer o subscribe

    constructor(private userService: UserService, private router: Router){
        this.user$ = userService.getUser();
    }

    logout(){
        this.userService.logout();
        this.router.navigate(['']);
    }
}