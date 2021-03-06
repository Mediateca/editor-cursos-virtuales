import { Component, Input } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import { Quill } from 'quill';

@Component({
    selector: 'app-texto-plano',
    template: `
                <h1>Texto plano en la sección {{seccion.titulo?seccion.titulo:'sin nombre.'}}</h1>
                <quill-editor [modules]="configuracionEditor" format="html" [(ngModel)]="seccion.componentes[num].contenido.texto" [placeholder]="'Inserte texto'">
                </quill-editor>
            `,
    styles: []
})
export class TextoPlanoComponent {
    @Input() configuracionEditor: any;
    @Input() seccion: any;
    @Input() num: number;
}
