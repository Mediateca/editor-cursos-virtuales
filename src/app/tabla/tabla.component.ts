import { Component, Input  } from '@angular/core';

@Component({
    selector: 'app-tabla',
    templateUrl: './tabla.component.html',
    styleUrls: ['./tabla.component.scss']
})
export class TablaComponent {
    @Input() configuracionEditor: any;
    @Input() seccion: any;
    @Input() num: number;
    constructor() {
        console.log(this.produceTabla());
    }
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
                                        'abreCelda': '<th>',
                                        'contenido': 'HEAD',
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
                                        'abreCelda': '<td>',
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
    produceTabla() {
        let salida:string;
        let filaHeader:string;
        salida = this.tabla.abreTabla+this.tabla.contenido.head.abreHead;
        this.tabla.contenido.head.contenido.forEach(fila => {
            salida += fila.fila.abreFila;
            fila.fila.contenido.forEach(celda => {
                salida += celda.celda.abreCelda+celda.celda.contenido+celda.celda.cierraCelda;
            });
            salida += fila.fila.cierraFila;
        });
        salida += this.tabla.contenido.head.cierraHead+this.tabla.contenido.body.abreBody;
        this.tabla.contenido.body.contenido.forEach(fila => {
            salida += fila.fila.abreFila;
            fila.fila.contenido.forEach(celda => {
                salida += celda.celda.abreCelda+celda.celda.contenido+celda.celda.cierraCelda;
            });
            salida += fila.fila.cierraFila;
        });
        salida += this.tabla.contenido.body.cierraBody+this.tabla.cierraTabla;
        console.log(salida);
        return salida;
    }
}
