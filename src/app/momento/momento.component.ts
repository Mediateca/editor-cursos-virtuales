import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-momento',
    template: `
                <h1>
                    Momento {{numMomento+1}} del módulo
                    {{modulo.titulo? modulo.titulo : 'Módulo sin nombre'}}
                </h1>
                <form clrForm clrLayout="horizontal">
                    <clr-input-container>
                        <label>Título del momento</label>
                        <input clrInput type="text" [(ngModel)]="momento.titulo" name="titulo" size="60">
                    </clr-input-container>
                    <clr-textarea-container>
                        <label>Descripción del momento</label>
                        <textarea clrTextarea [(ngModel)]="momento.intro" name="intro" cols="60"></textarea>
                    </clr-textarea-container>
                </form>
            `,
    styles: []
})
export class MomentoComponent {
    @Input() contenido: any;
    @Input() modulo: any;
    @Input() numMomento: number;
    @Input() momento: any;
    constructor() {}
}
