import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-media',
    templateUrl: './media.component.html',
    styles: [`
                .contenedor-form {
                    max-width: 20rem;
                }
            `]
})
export class MediaComponent {
    @Input() seccion: any;
    @Input() num: number;
    @Input() nomCurso: string;
    conPie:boolean = true;
    asignaPie(pie:boolean) {
        this.seccion.componentes[this.num].contenido.pie = pie?this.seccion.componentes[this.num].contenido.pie:'';
    }
}
