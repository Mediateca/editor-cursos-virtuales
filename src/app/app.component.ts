import { Component } from '@angular/core';
import { DragulaService } from 'ng2-dragula';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    categorias: Array<any> =[
        {'name':'MODULOS','class':'drag-modulo'},
        {'name':'MOMENTOS','class':'drag-momento'},
        {'name':'SECCIONES','class':'drag-seccion'},
        {'name':'COMPONENTES','class':'drag-componente'}
    ];
    constructor(private dragulaService: DragulaService) {
        for (let group of this.categorias) {
            dragulaService.createGroup(group.name, {
                removeOnSpill: false,
                moves: function (el, container, target) {
                    if (target.classList) {
                        return target.classList.contains(group.class);
                    }
                    return false;
                }
            });
        }
    }
    contenido: any = {
        "branding": {
            "tituloLargo": "",
            "tituloCorto": "",
            "colorPrimario": 1,
            "nombreCurso": ""
        },
        "modulos": [
            {
                "titulo": "",
                "intro": "",
                "momentos": [
                    {
                        "titulo": "",
                        "intro": "",
                        "secciones": [
                            {
                                "titulo": "",
                                "componentes": []
                            }
                        ]
                    }
                ]
            }
        ]
    };
    modalBorrar: any = {};
    modalNew: any = {};
    configuracionEditor = {toolbar: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false]}],
        ['bold', 'italic', 'underline', 'strike','blockquote'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        ['link'],['clean']
    ]};
    componenteActivo: any = this.contenido.branding;
    numComponente: number = 0;
    editandoModulo: any;
    editandoMomento: any;
    editandoSeccion: any;
    editaModulo(componente: any, num: number = 0) {
        this.componenteActivo = componente;
        this.numComponente = num;
    };
    editaMomento(modulo: any,componente: any, num: number = 0) {
        this.numComponente = num;
        this.editandoModulo = modulo;
        this.editandoMomento = componente;
        this.componenteActivo = componente;
    };
    editaSeccion(momento: any,componente:any,num:number){
        this.numComponente = num;
        this.editandoMomento = momento;
        this.editandoSeccion = componente;
        this.componenteActivo = componente;
    };
    intentaEliminarComponente(componente: any, num: number) {
        let titulo: string = componente[num].titulo?componente[num].titulo:"componente sin nombre";
        this.modalBorrar = {
            "titulo": "Esta acción borrará "+titulo+".",
            "texto": "¿Está seguro de eliminar "+titulo+"? Esta acción es irreversible.",
            "textoAccion": "Eliminar el componente",
            "componente": componente,
            "num": num,
            "activa": true
        }
    };
    eliminaComponente(componente: any, num: number){
        componente.splice(num, 1);
        this.modalBorrar = {"activa":false};
    };
    nuevoModulo() {
        this.contenido.modulos.push({"titulo":"","intro":"","momentos":[{"titulo":"","intro":"","secciones":[{"titulo":"","componentes":[]}]}]});
    };
    nuevoMomento(modulo: any) {
        modulo.push({"titulo":"","intro":"","secciones":[{"titulo":"","componentes":[]}]});
    };
    nuevaSeccion(momento: any) {
        momento.push({"titulo":"","componentes":[]});
    };
    nuevoComponente(seccion: any) {
        this.modalNew = {
            "titulo": "Crear un nuevo componente de contenido",
            "texto": "Seleccione el tipo de componente que quiere construir.",
            "textoAccion": "Crear componente",
            "seccion": seccion,
            "activa": true
        }
    }
    iniciaNuevoComponente(seccion: any, tipoComponente: string){
        this.modalNew = {'activa':false};
        this.componenteActivo = tipoComponente;
    }
    escribe(entrada:any){
        console.log(entrada)
    };
}
