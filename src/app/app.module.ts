import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule, ClrFormsNextModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { QuillModule } from 'ngx-quill';
import { BrandingComponent } from './branding/branding.component';
import { TextoPlanoComponent } from './texto-plano/texto-plano.component';
import { ModuloComponent } from './modulo/modulo.component';
import { DragulaModule } from 'ng2-dragula';
import { MomentoComponent } from './momento/momento.component';

@NgModule({
    declarations: [
        AppComponent,
        BrandingComponent,
        TextoPlanoComponent,
        ModuloComponent,
        MomentoComponent
    ],
    imports: [
        BrowserModule,
        ClarityModule,
        ClrFormsNextModule,
        BrowserAnimationsModule,
        FormsModule,
        QuillModule,
        DragulaModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent],
    exports: [BrandingComponent, TextoPlanoComponent, ModuloComponent, MomentoComponent]
})
export class AppModule { }
