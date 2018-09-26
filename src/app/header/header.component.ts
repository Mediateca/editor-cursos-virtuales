import { Component, Output, EventEmitter } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent{
    @Output() cambiaCurso: EventEmitter<any> = new EventEmitter();
    cursos: AngularFirestoreCollection<any>;
    cursosObs: Observable<any[]>;
    nombreCursos: Array<string> = [];
    numCurso: number = 0;
    modalNew: any = {'activa':false};
    constructor(private db: AngularFirestore) {
        this.cursos = db.collection('cursos');
        this.cursos.snapshotChanges().subscribe(data => {
            data.map(a => this.nombreCursos.push(a.payload.doc.id));
            this.cambiaCurso.emit(data[this.numCurso].payload.doc.id);
        });
        this.cursosObs = this.cursos.valueChanges();
    }
    cambiarCurso(numCurso:number) {
        this.numCurso = numCurso;
        this.cambiaCurso.emit(this.nombreCursos[numCurso]);
    }
    nuevoCurso() {
        this.modalNew = {"activa": true};
    }
    creaCurso(nombreCursoCorto:string) {
        this.modalNew = {"activa": false};
        this.cursos.add({
            "branding": {
                "tituloLargo": "",
                "tituloCorto": "",
                "colorPrimario": 1,
                "nombreCurso": "",
                'nombreCursoCorto': nombreCursoCorto
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
        });
    }
}
