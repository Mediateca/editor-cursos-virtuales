import { Component, Input } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { UploadEvent, UploadFile } from 'ngx-file-drop';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-carga-imagen',
    templateUrl: './carga-imagen.component.html',
    styles: [`
                .img-prevista {
                    max-width: 100%;
                    height: auto;
                }
                .progress {
                    height: 2em;
                    margin: 0;
                    position: relative;
                }
                .progress>progress {
                    height: 100%;
                    position: relative;
                }
                .botones-giro {
                    position: absolute;
                    right: 0.25rem;
                    z-index: 1;
                }
                .botones-giro .btn {
                    background-color: rgba(255,255,255,0.75);
                }
            `]
})
export class CargaImagenComponent {
    @Input() contenido: any;
    @Input() nomCurso: string;
    ruta:string;
    tipos:Array<string> = ['image/jpeg','image/png','image/svg+xml','audio/mpeg','video/mp4'];
    mediaCargada:boolean = false;
    archivoMedia:File;
    imagenValida:boolean = true;
    srcImagen:string;
    barraCarga:boolean = false;
    progresoCarga:Observable<number>;
    modalVerificar:any = {'estado': false};
    nombreRadio:string = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    constructor(private storage: AngularFireStorage, private http:HttpClient) {}
    validaArchivo(ev,drop:boolean) {
        if (drop) {
            ev.files[0].fileEntry.file((file:File)=>{this.cargaArchivo(file)});
        } else {
            this.cargaArchivo(ev.target.files[0]);
        }
    }
    validaURL() {
        this.http.get(this.ruta, {responseType: 'blob'}).subscribe((archivo)=>{
            if (this.tipos.find((e)=>{return e == archivo.type})) {
                this.archivoMedia = null;
                this.srcImagen = this.ruta;
                this.contenido.ruta = this.ruta;
                this.mediaCargada = true;
                this.contenido.nombre = this.ruta.substring(this.ruta.lastIndexOf('/')+1);
                this.contenido.style = '';
            }
        });
    }
    cargaArchivo(archivo:File) {
        if (this.tipos.find((e)=>{return e == archivo.type})) {
            this.srcImagen = URL.createObjectURL(archivo);
            this.mediaCargada = true;
            this.archivoMedia = archivo;
            this.ruta = '';
            this.contenido.style = '';
        }
    }
    confirmarCarga() {
        if(this.archivoMedia) {
            this.contenido.origen = 'local';
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
                                    this.asignaValores(data,'local',this.archivoMedia.name,'');
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
                                this.asignaValores(data,'local',this.archivoMedia.name,'');
                            });
                        })).subscribe();
                    }
                });
        } else {
            this.contenido.ruta = this.ruta;
        }
    }
    asignaValores(data:string,origen:string,nombre:string,estilo:string) {
        this.contenido.ruta = data;
        this.contenido.origen = origen;
        this.contenido.nombre = nombre;
        this.contenido.style = estilo;
        this.barraCarga = false;
    }
    errorImagen(ev) {
        this.imagenValida = false;
        console.log('Error',ev);
    }
    eliminaMedia() {
        switch (this.contenido.origen) {
            case 'local':
                const filePath = this.nomCurso + '/medias/'+this.contenido.nombre;
                const fileRef = this.storage.ref(filePath);
                fileRef.delete();
                this.asignaValores('','local','','');
                this.mediaCargada = false;
                break;
            case 'url':
                this.asignaValores('','local','','');
                this.mediaCargada = false;
                break;
        }
    }
    giraImg() {
        var angle:number;
        var partIni:string = 'rotate(';
        var partFin:string = 'deg)';
        if (this.contenido.style && this.contenido.style.transform) {
            var inicio:number = partIni.length;
            var final:number = this.contenido.style.transform.indexOf(partFin);
            angle = Number(this.contenido.style.transform.substr(inicio,final-inicio));
        } else {
            angle = 0;
            if (this.contenido.style) {
                this.contenido.style.transform = '';
            } else {
                this.contenido.style = {'transform':''};
            }
        }
        angle = (angle + 90) % 360;
        this.contenido.style.transform = partIni+String(angle)+partFin;
    }
}
