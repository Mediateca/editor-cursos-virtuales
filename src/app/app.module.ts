import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClarityModule, ClrFormsNextModule } from '@clr/angular';
import { QuillModule } from 'ngx-quill';
import { DragulaModule } from 'ng2-dragula';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FileDropModule } from 'ngx-file-drop';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { BrandingComponent } from './branding/branding.component';
import { TextoPlanoComponent } from './texto-plano/texto-plano.component';
import { ModuloComponent } from './modulo/modulo.component';
import { MomentoComponent } from './momento/momento.component';
import { SeccionComponent } from './seccion/seccion.component';
import { DestacadoComponent } from './destacado/destacado.component';
import { RecuerdaComponent } from './recuerda/recuerda.component';
import { HeaderComponent } from './header/header.component';
import { TablaComponent } from './tabla/tabla.component';
import { SanitizeHtmlPipe } from './sanitize-html.pipe';
import { TheaderComponent } from './tabla/theader/theader.component';
import { TbodyComponent } from './tabla/tbody/tbody.component';
import { MediaComponent } from './media/media.component';
import { ContenedoresComponent } from './contenedores/contenedores.component';
import { CargaImagenComponent } from './carga-imagen/carga-imagen.component';

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
        SanitizeHtmlPipe,
        TheaderComponent,
        TbodyComponent,
        MediaComponent,
        ContenedoresComponent,
        CargaImagenComponent
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
        AngularFirestoreModule.enablePersistence(),
        AngularFireStorageModule,
        HttpClientModule,
        FileDropModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
