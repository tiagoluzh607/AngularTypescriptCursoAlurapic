import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './auth/request.interceptor';
import { FooterComponent } from './footer/footer.component';
import { AlertModule } from '../shared/alert/alert.module';
import { LoadingModule } from '../shared/loading/loading.module';
import { MenuModule } from '../shared/menu/menu.module';
import { ShowIfLoggedModule } from '../shared/directives/show-if-logged/show-if-logged.module';

@NgModule({
    declarations: [HeaderComponent, FooterComponent],
    imports:[
        CommonModule, 
        RouterModule,
        AlertModule,
        LoadingModule,
        MenuModule,
        ShowIfLoggedModule
    ],
    exports: [HeaderComponent, FooterComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS, //para o http interceptor
            useClass: RequestInterceptor, // usar requestInterceptor
            multi: true //permite mais interceptadores
        }
    ]
})
export class CoreModule{

}