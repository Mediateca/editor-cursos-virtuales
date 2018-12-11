import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-contenedores',
    templateUrl: './contenedores.component.html',
    styles: [`
                .bloque-select {
                    display: inline-block;
                    margin-left: 1rem;
                }
                .radio.btn label {
                    max-width: fit-content;
                }
                .titulo-control {
                    display: block;
                    color: #444;
                    font-size: .541667rem;
                    font-weight: 600;
                    line-height: .75rem;
                    width: 8rem;
                    flex-shrink: 0;
                }
            `]
})
export class ContenedoresComponent {
    @Input() seccion: any;
    @Input() num: number;
    @Input() nomCurso: string;
    @Input() configuracionEditor: any;
    @Input() ancho: number;
    nuevoContenedor() {
        this.seccion.componentes[this.num].contenido.contenedores.push({'titulo':'','texto':''});
    }
    nuevoContenido() {
        this.seccion.componentes[this.num].contenido.contenidos.push({'titulo':'','texto':'','contenedor':0});
    }
}
