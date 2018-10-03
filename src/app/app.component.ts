import { Component} from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { DragulaService } from 'ng2-dragula';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        trigger('animMenu',[
            state('abierto', style(
                {maxWidth: '41.666667%'}
            )),
            state('cerrado', style(
                {maxWidth: '0%'}
            )),
            transition('abierto <=> cerrado', animate('800ms 0.5s ease-out'))
        ]),
        trigger('animContenido', [
            state('abierto', style(
                {opacity: '1'}
            )),
            state('cerrado', style(
                {opacity: '0'}
            )),
            transition('abierto <=> cerrado', animate('800ms 0.5s ease-out'))
        ]),
        trigger('animBoton', [
            state('abierto', style(
                {right: '0'}
            )),
            state('cerrado', style(
                {right: '-1rem'}
            )),
            transition('abierto <=> cerrado', animate('800ms 0.5s ease-out'))
        ]),
        trigger('animIcono', [
            state('abierto', style(
                {transform: 'rotate(270deg)'}
            )),
            state('cerrado', style(
                {transform: 'rotate(90deg)'}
            )),
            transition('abierto <=> cerrado', animate(500))
        ])
    ]
})
export class AppComponent {
    categorias: Array<any> =[
        {'name':'MODULOS','class':'drag-modulo'},
        {'name':'MOMENTOS','class':'drag-momento'},
        {'name':'SECCIONES','class':'drag-seccion'},
        {'name':'COMPONENTES','class':'drag-componente'}
    ];
    datosInicializados: boolean = false;
    tiposComponente: any = {
        'texto-plano': {'icono':'text', 'nombre': 'Texto'},
        'destacado': {'icono':'tag', 'nombre': 'Destacado'},
        'recuerda': {'icono':'pinboard', 'nombre': 'Recuerda'},
        'tabla': {'icono':'grid-view', 'nombre': 'Tabla'}
    };
    contenido: any = {
        "branding": {
            "tituloLargo": "",
            "tituloCorto": "",
            "colorPrimario": 1,
            "nombreCurso": "",
            'nombreCursoCorto': ''
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
    componenteActivo: any = this.contenido.branding;
    arrayComponentes: Array<any>;
    curso: AngularFirestoreDocument<any>;
    tiempo: any;
    panelAbierto: string = 'abierto';
    togglePanel() {
        this.panelAbierto = this.panelAbierto == 'abierto'?'cerrado':'abierto';
    }
    autoguardado: boolean = false; //-----------------------> Autoguardado
    guardado: boolean = true;
    constructor(private dragulaService: DragulaService,
                 private sanitizer: DomSanitizer,
                 public db: AngularFirestore) {
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
        this.arrayComponentes = Object.keys(this.tiposComponente).map(i => this.tiposComponente[i]);
        for (let num in this.arrayComponentes) {
            this.arrayComponentes[num].tipo = Object.keys(this.tiposComponente)[num];
        }
    }
    cambiaCurso(nomCurso:string) {
        let ruta: string = 'cursos/'+nomCurso;
        this.curso = this.db.doc(ruta);
        this.curso.valueChanges().subscribe(data => {
            this.contenido = data;
            this.componenteActivo = this.contenido.branding;
            this.datosInicializados = true;
            this.activaAutoguardado(this.autoguardado);
        });
    };
    activaAutoguardado(guardar:boolean) {
        this.autoguardado = guardar;
        if (guardar) {
            this.tiempo = setInterval(() => {
                this.guardado = false;
                setTimeout(()=>this.guardado=true, 2000);
                this.curso.update(this.contenido);
            },30000);
        } else {
            clearInterval(this.tiempo);
            this.guardado = true;
        }
    }
    guardaContenido() {
        this.curso.update(this.contenido);
        this.guardado = false;
        setTimeout(()=>this.guardado=true, 1000);
    }
    rutaDescargaJSON:SafeUrl;
    generaRutaJSON() {
        let elJSON = JSON.stringify(this.contenido);
        let blob = new Blob([elJSON], { type: 'text/json' });
        let url = window.URL.createObjectURL(blob);
        let uri:SafeUrl = this.sanitizer.bypassSecurityTrustUrl(url);
        this.rutaDescargaJSON = uri;
        return uri;
    }
    modalBorrar: any = {};
    modalNew: any = {};
    configuracionEditor = {toolbar: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false]}],
        ['bold', 'italic', 'underline', 'strike','blockquote'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        ['link'],['clean']
    ]};
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
    editaComponente(seccion:any,num:number,tipo:string){
        this.componenteActivo = tipo;
        this.editandoSeccion = seccion;
        this.numComponente = num;
    };
    intentaEliminarComponente(componente: any, num: number, titulo: string = undefined) {
        if (!titulo) {
            let titulo: string = componente[num].titulo?componente[num].titulo:"componente sin nombre";
        }
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
    nuevoComponente(seccion: any) {
        this.modalNew = {
            "titulo": "Crear un nuevo componente de contenido",
            "texto": "Seleccione el tipo de componente que quiere construir.",
            "textoAccion": "Crear componente",
            "seccion": seccion,
            "activa": true
        }
    }
    nuevoElemento(elemento:any,tipo:string) {
        switch(tipo) {
            case 'modulo':
                elemento.push({"titulo":"","intro":"","momentos":[{"titulo":"","intro":"","secciones":[{"titulo":"","componentes":[]}]}]});
                break;
            case 'momento':
                elemento.push({"titulo":"","intro":"","secciones":[{"titulo":"","componentes":[]}]});
                break;
            case 'seccion':
                elemento.push({"titulo":"","componentes":[]});
                break;
            case 'texto-plano':
                elemento.componentes.push({'tipo': tipo, 'contenido': {'texto':''}});
                break;
            case 'destacado':
                elemento.componentes.push({'tipo': tipo, 'contenido': {'texto':'','titulo':'', 'opcion':0}});
                break;
            case 'recuerda':
                elemento.componentes.push({'tipo': tipo, 'contenido': {'texto':''}});
                break;
            case 'tabla':
                elemento.componentes.push({'tipo': tipo, 'contenido': {'texto':''}});
                break;
        }
        this.modalNew = {'activa':false};
    }
}
