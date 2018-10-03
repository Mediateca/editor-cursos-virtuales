import { Component, Input } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import { Quill } from 'quill';

@Component({
    selector: 'app-destacado',
    template: `
                <h1>Destacado en la sección {{seccion.titulo?seccion.titulo:'sin nombre.'}}</h1>
                <form clrForm clrLayout="horizontal">
                    <clr-input-container>
                        <label>Título del destacado</label>
                        <input clrInput type="text" [(ngModel)]="seccion.componentes[num].contenido.titulo" name="titulo" size="60">
                    </clr-input-container>
                    <clr-input-container>
                        <label>Opción del destacado</label>
                        <input clrInput type="number" [(ngModel)]="seccion.componentes[num].contenido.opcion" name="opcion" size="2" min="0">
                    </clr-input-container>
                </form>
                <quill-editor [modules]="configuracionEditor" format="html" [(ngModel)]="seccion.componentes[num].contenido.texto" [placeholder]="'Inserte texto'">
                </quill-editor>
            `,
    styles: []
})
export class DestacadoComponent {
    @Input() configuracionEditor: any;
    @Input() seccion: any;
    @Input() num: number;
}