import { Directive, ElementRef, HostListener, Renderer, Input } from '@angular/core';

@Directive({
    selector: '[apDarkenOnHover]' //para usar a diretiva como um atributo
})
export class DarkenOnHoverDirective{

    @Input() brightness = '70%';
    
    constructor(private el: ElementRef, private render: Renderer){ //injeta o elemento que tem a diretiva
    }

    @HostListener('mouseover') //atribui a funcao ao evento disparado no elemento que tem a diretiva
    darkenOn(){
        //vamos manipular o elemento nao usando o DOM e sim o render
        this.render.setElementStyle(this.el.nativeElement, 'filter', `brightness(${this.brightness})`); //adiciona no elemento nativo um css  

    }

    @HostListener('mouseleave')
    darkenOff(){
        this.render.setElementStyle(this.el.nativeElement, 'filter', 'brightness(100%)');
    }
}