import { Component } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import { Quill } from 'quill';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    texto: String = "";
    configuracionTexto = {toolbar: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false]}],
        ['bold', 'italic', 'underline', 'strike','blockquote'],
        [{ 'script': 'sub'}, { 'script': 'super' }],['clean'],
        ['link', 'image', 'video']
    ]};
    listado = [
        {id: 1, texto: 'Lorem ipsum dolor sit amet'},
        {id: 2, texto: 'consectetur adipiscing elit.'},
        {id: 3, texto: 'Aliquam quis feugiat nisi.'},
        {id: 4, texto: 'Suspendisse a eros quis mauris rhoncus malesuada.'},
        {id: 5, texto: 'Fusce blandit nisl eget sem convallis.'},
        {id: 6, texto: 'ut tempus tortor pharetra.'},
        {id: 7, texto: 'Nunc eu rhoncus libero.'}
    ];
}
