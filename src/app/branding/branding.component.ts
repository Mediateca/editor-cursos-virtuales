import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-branding',
    template: `
                <h1>Datos generales del curso</h1>
                <form clrForm clrLayout="horizontal">
                    <clr-input-container>
                        <label>Nombre largo del cliente</label>
                        <input clrInput type="text" [(ngModel)]="branding.tituloLargo" name="tituloLargo" size="60">
                    </clr-input-container>
                    <clr-input-container>
                        <label>Nombre corto del cliente</label>
                        <input clrInput type="text" [(ngModel)]="branding.tituloCorto" name="tituloCorto" size="60">
                    </clr-input-container>
                    <clr-input-container>
                        <label>Nombre del curso</label>
                        <input clrInput type="text" [(ngModel)]="branding.nombreCurso" name="nombreCurso" size="60">
                    </clr-input-container>
                </form>
                <br>
                <div class="clr-row">
                    <div class="clr-col-2 clr-control-label">Color base del curso</div>
                    <div class="clr-col">
                        <clr-button-group>
                            <clr-button class="radio btn" *ngFor="let color of colores; first as primero">
                                <input type="radio" name="color" id="{{'color-'+color}}" [(ngModel)]="branding.colorPrimario" [value]="color">
                                <label for="{{'color-'+color}}" [ngClass]="'color-'+color">
                                    <clr-icon shape="check-circle" class="is-solid" size="24"></clr-icon>
                                </label>
                            </clr-button>
                        </clr-button-group>
                    </div>
                </div>
            `,
    styles: [`
                input:checked+label clr-icon {opacity:1 !important;}
                label clr-icon {opacity:0;}
                .color-1 {background-color:#313131 !important;}
                .color-2 {background-color:#485969 !important;}
                .color-3 {background-color:#281336 !important;}
                .color-4 {background-color:#006A91 !important;}
                .color-5 {background-color:#004A70 !important;}
                .color-6 {background-color:#002438 !important;}
            `]
})
export class BrandingComponent {
    @Input() branding: any;
    colores: Array<any> = [1,2,3,4,5,6];
    constructor() {}
}
