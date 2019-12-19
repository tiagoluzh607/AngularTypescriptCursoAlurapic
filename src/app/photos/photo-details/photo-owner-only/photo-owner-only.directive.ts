import { Directive, Input, ElementRef, Renderer, OnInit } from "@angular/core";
import { Photo } from "../../photo/photo";
import { UserService } from "src/app/core/user/user.service";

@Directive({
    selector: '[photoOwnerOnly]'
})
export class PhotoOwnerOnlyDirective implements OnInit{

    @Input() ownedPhoto: Photo;

    constructor(
        private element: ElementRef<any>,
        private renderer: Renderer,
        private userService: UserService
    ){}

    ngOnInit(): void{
        this.userService
            .getUser()
            .subscribe(
                (user)=>{
                    if(!user || user.id != this.ownedPhoto.userId){// caso o usuario seja nulo ou diferente do usuario logado
                        this.renderer.setElementStyle(this.element.nativeElement, 'display', 'none'); //nao exibe elemento com a diretiva
                    }
                }
            )
    }
}