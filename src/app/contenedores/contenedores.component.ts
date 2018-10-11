import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-contenedores',
    templateUrl: './contenedores.component.html',
    styles: []
})
export class ContenedoresComponent {
    @Input() seccion: any;
    @Input() num: number;
    @Input() nomCurso: string;
    @Input() configuracionEditor: any;
    nuevoContenedor() {
        this.seccion.componentes[this.num].contenido.contenedores.push({'texto':'','ruta':'','origen':'local','nombre':''});
    }
    nuevoContenido() {
        this.seccion.componentes[this.num].contenido.contenidos.push({'texto':'','ruta':'','origen':'local','nombre':'','contenedor':0});
    }
}
