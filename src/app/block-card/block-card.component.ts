import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-block-card',
    template:   `
                    <div class="incluir-media" *ngIf="!elemento.media">
                        Incluir un multimedia
                        <button class="btn btn-link btn-icon" (click)="nuevoMedia()">
                            <clr-icon shape="plus-circle"></clr-icon>
                        </button>
                    </div>
                    <div class="eliminar-media" *ngIf="elemento.media">
                        Eliminar multimedia
                        <button class="btn btn-link btn-icon" (click)="eliminaMedia()">
                            <clr-icon shape="times-circle"></clr-icon>
                        </button>
                        <app-carga-imagen [contenido]="elemento.media" [nomCurso]="nomCurso"></app-carga-imagen>
                    </div>
                    <form clrForm clrLayout="horizontal">
                        <clr-input-container>
                            <label>Título</label>
                            <input clrInput type="text" [(ngModel)]="elemento.titulo" name="titulo" style="width:100%">
                        </clr-input-container>
                    </form>
                    <p class="titulo-control">Texto</p>
                    <quill-editor [modules]="configuracionEditor" format="html" [(ngModel)]="elemento.texto" [placeholder]="''">
                    </quill-editor>
                `,
    styles: []
})
export class BlockCardComponent {
    @Input() elemento: any;
    constructor() {}
    nuevoMedia() {
        this.elemento.media = {'ruta':'','origen':'local','nombre':''};
    }
    eliminaMedia() {
        delete this.elemento.media;
    }
}
