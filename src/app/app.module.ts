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
import { SeccionComponent } from './seccion/seccion.component';
import { DestacadoComponent } from './destacado/destacado.component';
import { RecuerdaComponent } from './recuerda/recuerda.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { HeaderComponent } from './header/header.component';
import { TablaComponent } from './tabla/tabla.component';
import { SanitizeHtmlPipe } from './sanitize-html.pipe';

@NgModule({
    declarations: [
        AppComponent,
        BrandingComponent,
        TextoPlanoComponent,
        ModuloComponent,
        MomentoComponent,
        SeccionComponent,
        DestacadoComponent,
        RecuerdaComponent,
        HeaderComponent,
        TablaComponent,
        SanitizeHtmlPipe
    ],
    imports: [
        BrowserModule,
        ClarityModule,
        ClrFormsNextModule,
        BrowserAnimationsModule,
        FormsModule,
        QuillModule,
        DragulaModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireStorageModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
