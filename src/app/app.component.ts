import { Component, OnInit } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';

import Quill from 'quill';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    texto: String = "";
    configuracionTexto = {toolbar: [
            ['bold', 'italic', 'underline', 'strike','blockquote'],
            ['sub', 'sup'],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            ['clean'],                                         // remove formatting button

            ['link', 'image', 'video']                         // link and image, video
        ]
    };
    constructor() {}
    ngOnInit () {

    }
}
