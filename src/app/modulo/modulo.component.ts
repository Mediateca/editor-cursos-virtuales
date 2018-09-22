import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-modulo',
    template: `
                <h1>
                    Módulo {{numModulo+1}} del curso
                    {{contenido.branding.nombreCurso? contenido.branding.nombreCurso : 'Curso sin nombre'}}
                </h1>
                <form clrForm clrLayout="horizontal">
                    <clr-input-container>
                        <label>Título del módulo</label>
                        <input clrInput type="text" [(ngModel)]="modulo.titulo" name="titulo" size="60">
                    </clr-input-container>
                    <clr-textarea-container>
                        <label>Descripción del módulo</label>
                        <textarea clrTextarea [(ngModel)]="modulo.intro" name="intro" cols="60"></textarea>
                    </clr-textarea-container>
                </form>
            `,
    styles: []
})
export class ModuloComponent {
    @Input() contenido: any;
    @Input() numModulo: number;
    @Input() modulo: any;
    constructor() {}
}
