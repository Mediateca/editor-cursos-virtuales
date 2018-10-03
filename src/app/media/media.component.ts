import { Component} from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
    selector: 'app-media',
    template: `
                <h2>Componente Media en sección {{'sección sin nombre'}}</h2>
                <div class="clr-row">
                    <div class="btn-group">
                        <div class="radio btn">
                            <input type="radio" name="origen-media" id="btn-local" value="local" [(ngModel)]="origen">
                            <label for="btn-local"><clr-icon shape="computer"></clr-icon> Desde mi equipo local</label>
                        </div>
                        <div class="radio btn">
                            <input type="radio" name="origen-media" id="btn-url" value="url" [(ngModel)]="origen">
                            <label for="btn-url"><clr-icon shape="network-globe"></clr-icon> Desde una URL en internet</label>
                        </div>
                    </div>
                </div>
                <div class="clr-row">
                    <div [ngSwitch]="origen">
                        <div *ngSwitchCase="'local'">
                            <label for="origen-local">Cargue el archivo multimedia desde su computador</label>
                            <input type="file" (change)="uploadFile($event)" id="origen-local">
                        </div>
                        <form class="clr-form clr-form-horizontal" *ngSwitchCase="'url'">
                            <clr-input-container>
                                <label>URL del archivo multimedia</label>
                                <input clrInput placeholder="Escriba la ruta URL" name="ruta-url" [(ngModel)]="ruta">
                            </clr-input-container>
                        </form>
                    </div>
                </div>
            `,
    styles: []
})
export class MediaComponent {
    origen: string = 'local';
    ruta: string;
    constructor(private storage: AngularFireStorage) {}
    uploadFile(event) {
        const file = event.target.files[0];
        const filePath = 'name-your-file-path-here';
        const task = this.storage.upload(filePath, file);
    }
}