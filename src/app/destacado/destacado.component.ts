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
                    <br>
                    <div class="clr-row">
                        <div class="clr-col-md-2 titulo-control">
                            Opción de Destacado
                        </div>
                        <div class="clr-col">
                            <div class="btn-group">
                                <div class="radio btn btn-outline">
                                    <input type="radio" name="opcion" id="op0" [value]="0" [(ngModel)]="seccion.componentes[num].contenido.opcion">
                                    <label for="op0">Opción de destacado 1</label>
                                </div>
                                <div class="radio btn btn-outline">
                                    <input type="radio" name="opcion" id="op1" [value]="1" [(ngModel)]="seccion.componentes[num].contenido.opcion">
                                    <label for="op1">Opción de destacado 2</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <h3>Contenido del destacado</h3>
                <quill-editor [modules]="configuracionEditor" format="html" [(ngModel)]="seccion.componentes[num].contenido.texto" [placeholder]="'Inserte texto'">
                </quill-editor>
            `,
    styles: [`
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
export class DestacadoComponent {
    @Input() configuracionEditor: any;
    @Input() seccion: any;
    @Input() num: number;
}
