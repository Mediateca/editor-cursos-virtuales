import { Component, Input, DoCheck } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import { Quill } from 'quill';

@Component({
    selector: 'app-tbody',
    template: `
                <ul class="card-text clr-row list-group list-group-flush">
                    <li class="celda clr-col list-group-item" *ngFor="let celda of fila;first as inicial;index as i">
                        <div class="contenedor-editor">
                            <quill-editor [modules]="configuracionEditor" format="html" [(ngModel)]="celda.celda.contenido" [placeholder]="''">
                            </quill-editor>
                        </div>
                        Ancho: {{cols[i]}}
                        <div class="btn-group btn-outline-primary btn-sm">
                            <button class="btn btn-icon" (click)="cambiaSpan(i,false)" [disabled]="cols[i]<2">
                                <clr-icon shape="caret left"></clr-icon>
                            </button>
                            <button class="btn btn-icon" (click)="cambiaSpan(i,true)" [disabled]="cols[i]>98">
                                <clr-icon shape="caret right"></clr-icon>
                            </button>
                        </div>
                        <div class="btn-group btn-outline-primary btn-sm btn-icon">
                            <clr-radio-wrapper class="radio btn">
                                <input type="radio" clrRadio name="{{'align'+i}}" [value]="true" [(ngModel)]="aligns[i]" (change)="cambiaAlineacion(i,true)">
                                <label><clr-icon shape="align-left-text"></clr-icon></label>
                            </clr-radio-wrapper>
                            <clr-radio-wrapper class="radio btn">
                                <input type="radio" clrRadio name="{{'align'+i}}" [value]="false" [(ngModel)]="aligns[i]"  (change)="cambiaAlineacion(i,false)">
                                <label><clr-icon shape="center-text"></clr-icon></label>
                            </clr-radio-wrapper>
                        </div>
                        <button class="btn btn-danger btn-sm btn-icon" *ngIf="!inicial" (click)="eliminaCol(i)">
                            <clr-icon shape="trash"></clr-icon>
                        </button>
                        <button class="btn btn-primary btn-sm btn-icon" *ngIf="inicial" (click)="nuevaColumna()">
                            <clr-icon shape="plus"></clr-icon>
                        </button>
                    </li><!-- /.celda -->
                </ul><!-- /.card-text -->
            `,
    styles: [``]
})
export class TbodyComponent implements DoCheck {
    @Input() fila: Array<any>;
    @Input() configuracionEditor: any;
    cols: Array<number> = [];
    aligns: Array<boolean> = [];
    nuevaColumna() {
        this.fila.push({
            'celda': {
                'abreCelda': '<td colspan="1">',
                'contenido': '',
                'cierraCelda': '</td>'
            }
        });
    }
    cambiaSpan(i:number,aumenta:boolean) {
        let num:number = Number(this.fila[i].celda.abreCelda.substr(13,2).replace('"',''));
        let align:string = '';
        if (this.fila[i].celda.abreCelda.indexOf('class="left"') > 0) {
            align = 'class="left"';
        }
        num = aumenta?num+1:num-1;
        this.fila[i].celda.abreCelda = this.fila[i].celda.abreCelda.substr(0,13)+String(num)+'" '+align+'>';
    }
    cambiaAlineacion(i:number,align:boolean) {
        if (align) {
            this.fila[i].celda.abreCelda = this.fila[i].celda.abreCelda.substr(0,this.fila[i].celda.abreCelda.indexOf('>')) + ' class="left"' + '>';
        } else {
            this.fila[i].celda.abreCelda = this.fila[i].celda.abreCelda.substr(0,this.fila[i].celda.abreCelda.indexOf(' class="left"')) + '>';
        }
    }
    calculaCols() {
        this.cols = [];
        for (let celda of this.fila) {
            let num:number = Number(celda.celda.abreCelda.substr(13,2).replace('"',''));
            this.cols.push(num);
        }
    }
    calculaAligns() {
        this.aligns = [];
        for (let celda of this.fila) {
            let num:number = Number(celda.celda.abreCelda.indexOf('class="left"'));
            this.aligns.push(num > 0 ? true : false);
        }
    }
    eliminaCol(i:number) {
        this.fila.splice(i,1);
    }
    ngDoCheck() {
        this.calculaCols();
        this.calculaAligns();
    }
}
