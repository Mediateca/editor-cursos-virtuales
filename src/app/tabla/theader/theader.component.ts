import { Component, Input, DoCheck } from '@angular/core';

@Component({
    selector: 'app-theader',
    template: `
                <div class="card">
                    <div class="card-header">Encabezado</div>
                    <div class="card-block">
                        <div class="card-text clr-row">
                            <div class="celda clr-col" *ngFor="let celda of fila;first as inicial;index as i">
                                <input type="text" [(ngModel)]="celda.celda.contenido">
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
                                        <input type="radio" clrRadio name="{{'alignH'+i}}" [value]="true" [(ngModel)]="aligns[i]" (change)="cambiaAlineacion(i,true)">
                                        <label><clr-icon shape="align-left-text"></clr-icon></label>
                                    </clr-radio-wrapper>
                                    <clr-radio-wrapper class="radio btn">
                                        <input type="radio" clrRadio name="{{'alignH'+i}}" [value]="false" [(ngModel)]="aligns[i]"  (change)="cambiaAlineacion(i,false)">
                                        <label><clr-icon shape="center-text"></clr-icon></label>
                                    </clr-radio-wrapper>
                                </div>
                                <button class="btn btn-danger btn-icon btn-sm" *ngIf="!inicial" (click)="eliminaCol(i)">
                                    <clr-icon shape="trash"></clr-icon>
                                </button>
                            </div><!-- /.celda -->
                        </div><!-- /.card-text -->
                    </div><!-- /.card-block -->
                    <div class="card-footer">
                        <button class="btn btn-primary" (click)="nuevaColumna()"><clr-icon shape="plus"></clr-icon> Nueva columna</button>
                    </div>
                </div><!-- /.card -->
            `,
    styles: [`
                .celda {
                }
                .celda>input {
                    width: 100%;
                    background-color: rgba(0,0,0,0.05);
                }
            `]
})
export class TheaderComponent implements DoCheck {
    @Input() fila: Array<any>;
    cols: Array<number> = [];
    aligns: Array<boolean> = [];
    nuevaColumna() {
        this.fila.push({
            'celda': {
                'abreCelda': '<th colspan="1">',
                'contenido': '',
                'cierraCelda': '</th>'
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