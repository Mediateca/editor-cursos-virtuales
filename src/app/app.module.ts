import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { QuillModule } from 'ngx-quill';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        ClarityModule,
        BrowserAnimationsModule,
        FormsModule,
        QuillModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }