import { Component, Input } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import { Quill } from 'quill';

@Component({
    selector: 'app-recuerda',
    template: `
                <h1>Recuerda en la sección {{seccion.titulo?seccion.titulo:'sin nombre.'}}</h1>
                <quill-editor [modules]="configuracionEditor" format="html" [(ngModel)]="seccion.componentes[num].contenido.texto" [placeholder]="'Inserte texto'">
                </quill-editor>
            `,
    styles: []
})
export class RecuerdaComponent {
    @Input() configuracionEditor: any;
    @Input() seccion: any;
    @Input() num: number;
}
