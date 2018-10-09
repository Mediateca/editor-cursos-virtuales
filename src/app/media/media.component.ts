import { Component, Input } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { UploadEvent, UploadFile } from 'ngx-file-drop';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-media',
    templateUrl: './media.component.html',
    styles: [`.img-prevista{max-width:100%;height:auto;}`]
})
export class MediaComponent {
    @Input() seccion: any;
    @Input() num: number;
    @Input() nomCurso: string;
    ruta:string;
    tipos:Array<string> = ['image/jpeg','image/png','image/svg+xml','audio/mpeg','video/mp4'];
    mediaCargada:boolean = false;
    archivoMedia:File;
    imagenValida:boolean = true;
    conPie:boolean = true;
    srcImagen:string;
    barraCarga:boolean = false;
    progresoCarga:Observable<number>;
    modalVerificar:any = {'estado': false};
    constructor(private storage: AngularFireStorage, private http:HttpClient) {}
    validaArchivo(ev,drop:boolean) {
        if (drop) {
            ev.files[0].fileEntry.file((file:File)=>{this.cargaArchivo(file)});
        } else {
            this.cargaArchivo(ev.target.files[0]);
        }
    }
    cargaArchivo(archivo:File) {
        if (this.tipos.find((e)=>{return e == archivo.type})) {
            this.srcImagen = URL.createObjectURL(archivo);
            this.mediaCargada = true;
            this.archivoMedia = archivo;
            this.ruta = '';
        }
    }
    validaURL() {
        this.http.get(this.ruta, {responseType: 'blob'}).subscribe((archivo)=>{
            if (this.tipos.find((e)=>{return e == archivo.type})) {
                this.archivoMedia = null;
                this.srcImagen = this.ruta;
                this.mediaCargada = true;
                this.seccion.componentes[this.num].contenido.nombre = this.ruta.substring(this.ruta.lastIndexOf('/')+1);
            }
        });
    }
    confirmarCarga() {
        if(this.archivoMedia) {
            this.seccion.componentes[this.num].contenido.origen = 'local';
            this.barraCarga = true;
            const filePath = this.nomCurso + '/medias/'+this.archivoMedia.name;
            const fileRef = this.storage.ref(filePath);
            fileRef.getMetadata().subscribe(
                (data) => {
                    this.modalVerificar = {
                        'titulo':'Multimedia ya existente',
                        'texto':'<p>Ya existe un archivo con ese nombre. ¿Desea reemplazarlo?</p>',
                        'accion': ()=>{
                            const tareaCarga = this.storage.upload(filePath, this.archivoMedia);
                            this.progresoCarga = tareaCarga.percentageChanges();
                            tareaCarga.snapshotChanges().pipe(finalize(() => {
                                fileRef.getDownloadURL().subscribe(data=>{
                                    this.seccion.componentes[this.num].contenido.ruta = data;
                                    this.seccion.componentes[this.num].contenido.origen = 'local';
                                    this.seccion.componentes[this.num].contenido.nombre = this.archivoMedia.name;
                                    this.barraCarga = false;
                                });
                            })).subscribe();
                            this.modalVerificar.estado=false;
                        },
                        'iconoAccion':'file-group',
                        'textoAccion':'Reemplazar',
                        'cerrar':()=>{this.modalVerificar.estado=false},
                        'textoCierre':'Cerrar sin reemplazar',
                        'estado':true
                    };
                },
                (error) => {
                    if(error.name == 'FirebaseError') {
                        const tareaCarga = this.storage.upload(filePath, this.archivoMedia);
                        this.progresoCarga = tareaCarga.percentageChanges();
                        tareaCarga.snapshotChanges().pipe(finalize(() => {
                            fileRef.getDownloadURL().subscribe(data=>{
                                this.seccion.componentes[this.num].contenido.ruta = data;
                                this.seccion.componentes[this.num].contenido.origen = 'local';
                                this.seccion.componentes[this.num].contenido.nombre = this.archivoMedia.name;
                                this.barraCarga = false;
                            });
                        })).subscribe();
                    }
                });
        } else {
            this.seccion.componentes[this.num].contenido.ruta = this.ruta;
        }
    }
    errorImagen(ev) {
        this.imagenValida = false;
        console.log('Error',ev);
    }
    asignaPie(pie:boolean) {
        this.seccion.componentes[this.num].contenido.pie = pie?this.seccion.componentes[this.num].contenido.pie:'';
    }
    eliminaMedia() {
        switch (this.seccion.componentes[this.num].contenido.origen) {
            case 'local':
                const filePath = this.nomCurso + '/medias/'+this.seccion.componentes[this.num].contenido.nombre;
                const fileRef = this.storage.ref(filePath);
                fileRef.delete();
                this.seccion.componentes[this.num].contenido.ruta = '';
                this.seccion.componentes[this.num].contenido.nombre = '';
                this.seccion.componentes[this.num].contenido.origen = 'local';
                this.mediaCargada = false;
                break;
            case 'url':
                this.seccion.componentes[this.num].contenido.ruta = '';
                this.seccion.componentes[this.num].contenido.nombre = '';
                this.seccion.componentes[this.num].contenido.origen = 'local';
                this.mediaCargada = false;
                break;
        }
    }
}
