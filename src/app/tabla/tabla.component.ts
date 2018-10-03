import { Component, Input, DoCheck, OnInit } from '@angular/core';

@Component({
    selector: 'app-tabla',
    templateUrl: './tabla.component.html',
    styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements DoCheck, OnInit {
    @Input() seccion: any;
    @Input() num: number;
    configuracionEditor = {toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        ['link'],['clean']
    ]};
    tablaTexto:string;
    inicializado:boolean = false;
    compacta:boolean = false;
    tablaSalida:string;
    maxCol:number = 1;
    tabla:any = {
        'abreTabla': '<table class="table">',
        'contenido': {
            'head': {
                'abreHead': '<thead>',
                'contenido': [
                    {
                        'fila': {
                            'abreFila': '<tr>',
                            'contenido': [
                                {
                                    'celda': {
                                        'abreCelda': '<th colspan="1">',
                                        'contenido': '',
                                        'cierraCelda': '</th>'
                                    }
                                }
                            ],
                            'cierraFila': '</tr>'
                        }
                    }
                ],
                'cierraHead': '</thead>'
            },
            'body': {
                'abreBody': '<tbody>',
                'contenido': [
                    {
                        'fila': {
                            'abreFila': '<tr>',
                            'contenido': [
                                {
                                    'celda': {
                                        'abreCelda': '<td colspan="1">',
                                        'contenido': '',
                                        'cierraCelda': '</td>'
                                    }
                                }
                            ],
                            'cierraFila': '</tr>'
                        }
                    }
                ],
                'cierraBody': '</tbody>'
            }
        },
        'cierraTabla': '</table>'
    }
    produceTabla():string {
        let salida:string;
        if (this.compacta) {
            salida = this.tabla.abreTabla.substr(0,this.tabla.abreTabla.indexOf('">')) + ' table-compact">';
        } else {
            salida = this.tabla.abreTabla;
        }
        salida += this.tabla.contenido.head.abreHead;
        this.tabla.contenido.head.contenido.forEach(fila => {
            salida += fila.fila.abreFila;
            fila.fila.contenido.forEach(celda => {
                salida += celda.celda.abreCelda+celda.celda.contenido+celda.celda.cierraCelda;
            });
            if (fila.fila.contenido.length > this.maxCol) {
                this.maxCol = fila.fila.contenido.length;
            }
            salida += fila.fila.cierraFila;
        });
        salida += this.tabla.contenido.head.cierraHead+this.tabla.contenido.body.abreBody;
        this.tabla.contenido.body.contenido.forEach(fila => {
            salida += fila.fila.abreFila;
            fila.fila.contenido.forEach(celda => {
                salida += celda.celda.abreCelda+celda.celda.contenido+celda.celda.cierraCelda;
            });
            if (fila.fila.contenido.length > this.maxCol) {
                this.maxCol = fila.fila.contenido.length;
            }
            salida += fila.fila.cierraFila;
        });
        salida += this.tabla.contenido.body.cierraBody+this.tabla.cierraTabla;
        return salida;
    }
    produceObjeto(miTabla:string):any {
        let tablaSalida:any = {};
        const tagTabla:RegExp = /(<table[ a-zA-Z="]*>|<\/table>)/gmi;
        const tagTHead:RegExp = /(<thead>|<\/thead>)/gmi;
        const tagTBody:RegExp = /(<tbody>|<\/tbody>)/gmi;
        const tagCont:RegExp = /(<tr>|<\/tr>)/gmi;
        const tagHeadCell:RegExp = /(<th[a-zA-Z ="0-9]*>|<\/th>)/gmi;
        const tagBodyCell:RegExp = /(<td[a-zA-Z ="0-9]*>|<\/td>)/gmi;
        let miArray:Array<string> = miTabla.split(tagTabla);
        tablaSalida.abreTabla = miArray[1];
        tablaSalida.cierraTabla = miArray[3];
        miArray = miArray[2].split(tagTHead);
        tablaSalida.contenido = {
            'head': {
                'abreHead': miArray[1],
                'contenido': [],
                'cierraHead': miArray[3]
            },
            'body': {
                'abreBody': '',
                'contenido': [],
                'cierraBody': ''
            }
        };
        let headCont:string = miArray[2];
        let body:string = miArray[4];
        miArray = body.split(tagTBody);
        tablaSalida.contenido.body.abreBody = miArray[1];
        let bodyCont:string = miArray[2];
        tablaSalida.contenido.body.cierraBody = miArray[3];
        miArray = headCont.split(tagCont);
        let numFilas:number = Math.floor((miArray.length - 2) / 3);
        for (let i:number = 0;i < numFilas; i++) {
            let pos:number = (i * 4) + 1;
            tablaSalida.contenido.head.contenido.push({
                'fila':{
                    'abreFila': miArray[pos],
                    'contenido': [],
                    'cierraFila': miArray[pos+2]
                }
            });
            let celdaArray:Array<string> = miArray[pos+1].split(tagHeadCell);
            let numCeldas:number = Math.floor((celdaArray.length - 2) / 3);
            for (let e:number = 0;e < numCeldas; e++) {
                let posCelda:number = (e * 4) + 1;
                tablaSalida.contenido.head.contenido[i].fila.contenido.push({
                    'celda': {
                        'abreCelda': celdaArray[posCelda],
                        'contenido': celdaArray[posCelda+1],
                        'cierraCelda': celdaArray[posCelda+2]
                    }
                });
            }
        }
        miArray = bodyCont.split(tagCont);
        numFilas = Math.floor((miArray.length - 2) / 3);
        for (let i:number = 0;i < numFilas; i++) {
            let pos:number = (i * 4) + 1;
            tablaSalida.contenido.body.contenido.push({
                'fila':{
                    'abreFila': miArray[pos],
                    'contenido': [],
                    'cierraFila': miArray[pos+2]
                }
            });
            let celdaArray:Array<string> = miArray[pos+1].split(tagBodyCell);
            let numCeldas:number = Math.floor((celdaArray.length - 2) / 3);
            for (let e:number = 0;e < numCeldas; e++) {
                let posCelda:number = (e * 4) + 1;
                tablaSalida.contenido.body.contenido[i].fila.contenido.push({
                    'celda': {
                        'abreCelda': celdaArray[posCelda],
                        'contenido': celdaArray[posCelda+1],
                        'cierraCelda': celdaArray[posCelda+2]
                    }
                });
            }
        }
        return tablaSalida;
    }
    ngDoCheck() {
        if (this.inicializado) {
            this.seccion.componentes[this.num].contenido.texto = this.produceTabla();
        }
    }
    ngOnInit() {
        if (this.seccion.componentes[this.num].contenido.texto != '') {
            this.tabla = this.produceObjeto(this.seccion.componentes[this.num].contenido.texto);
        }
        this.seccion.componentes[this.num].contenido.texto = this.produceTabla();
        this.inicializado = true;
    }
}
