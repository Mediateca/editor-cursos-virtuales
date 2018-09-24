import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-seccion',
    template: `
                <h1>
                    Seccion {{numSeccion+1}} del momento
                    {{momento.titulo? momento.titulo : 'Momento sin nombre'}}
                </h1>
                <form clrForm clrLayout="horizontal">
                    <clr-input-container>
                        <label>Título de la sección</label>
                        <input clrInput type="text" [(ngModel)]="seccion.titulo" name="titulo" size="60">
                    </clr-input-container>
                </form>
            `,
    styles: []
})
export class SeccionComponent {
    @Input() momento: any;
    @Input() numSeccion: number;
    @Input() seccion: any;
    constructor() {}
}
