import { Component, Input } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { UploadEvent, UploadFile } from 'ngx-file-drop';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-media',
    templateUrl: './media.component.html',
    styles: [`.img-prevista{max-width:100%;height:auto;}`]
})
export class MediaComponent {
    @Input() seccion: any;
    @Input() num: number;
    origen: string = 'local';
    ruta: string;
    tipos:Array<string> = ['image/jpeg','image/png','image/svg+xml','audio/mpeg','video/mp4'];
    mediaCargada:boolean = false;
    archivoMedia:File;
    imagenValida:boolean = true;
    conPie:boolean = true;
    srcImagen:string;
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
            //this.seccion.componentes[this.num].contenido.ruta = URL.createObjectURL(archivo);
            this.srcImagen = URL.createObjectURL(archivo);
            this.mediaCargada = true;
            this.archivoMedia = archivo;
            this.ruta = '';
            //document.getElementById('img-prevista').onload(()=>{URL.revokeObjectURL(archivo)});
            //const filePath = 'name-your-file-path-here';
            //const task = this.storage.upload(filePath, archivo);
        }
    }
    validaURL() {
        this.http.get(this.ruta, {responseType: 'blob'}).subscribe((archivo)=>{
            if (this.tipos.find((e)=>{return e == archivo.type})) {
                this.archivoMedia = null;
                //this.seccion.componentes[this.num].contenido.ruta = this.ruta;
                this.srcImagen = this.ruta;
                this.mediaCargada = true;
            }
        });
    }
    errorImagen(ev) {
        this.imagenValida = false;
        console.log('Error',ev);
    }
    asignaPie(pie:boolean) {
        this.seccion.componentes[this.num].contenido.pie = pie?this.seccion.componentes[this.num].contenido.pie:'';
    }
}
