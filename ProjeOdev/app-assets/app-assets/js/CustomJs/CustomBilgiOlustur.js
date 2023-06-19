tinymce.init({
    selector: "textarea",
    branding: false,
    language: 'tr',
    height: 450,
    entity_encoding: "raw",
    plugins: [
        "advlist autolink autosave link image lists charmap print preview hr anchor pagebreak",
        "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
        "table contextmenu directionality emoticons template textcolor paste fullpage textcolor colorpicker textpattern code image imagetools"
    ],

    toolbar1: "code | mybutton blockquote image media | newdocument | fullpage | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect | cut copy paste | bullist numlist | searchreplace | outdent indent | undo redo | link unlink anchor | insertdatetime preview | forecolor backcolor | table | hr removeformat | subscript superscript | charmap emoticons | print fullscreen | ltr rtl | visualchars visualblocks nonbreaking template pagebreak restoredraft",

    content_css: [
        '//fonts.googleapis.com/css?family=Old+Standard+TT|Open+Sans|Quicksand',
        '/assets/css/tinymce.css'
    ],
    font_formats: 'Open Sans=open sans, serif;Quicksand=quicksand, serif;Old Standard TT=old standard tt, serif',
    style_formats: [
        { title: 'Drop Cap', inline: 'span', classes: 'drop-cap' },
        { title: 'Drop Cap Renk', inline: 'span', classes: 'drop-cap drop-cap-reversed' },
        { title: 'Headers', items: [{ title: 'Header 1', block: 'h1' }, { title: 'Header 2', block: 'h2' }, { title: 'Header 3', block: 'h3' }, { title: 'Header 4', block: 'h4' }, { title: 'Header 5', block: 'h5' }, { title: 'Header 6', block: 'h6' }] }, { title: 'Inline', items: [{ title: 'Bold', icon: "bold", inline: 'strong' }, { title: 'Italic', icon: "italic", inline: 'em' }, { title: 'Underline', icon: "underline", inline: 'span', styles: { 'text-decoration': 'underline' } }, { title: 'Strikethrough', icon: "strikethrough", inline: 'span', styles: { 'text-decoration': 'line-through' } }, { title: 'Superscript', icon: "superscript", inline: 'sup' }, { title: 'Subscript', icon: "subscript", inline: 'sub' }, { title: 'Code', icon: "code", inline: 'code' }] }, { title: 'Blocks', items: [{ title: 'Paragraph', block: 'p' }, { title: 'Blockquote', block: 'blockquote' }, { title: 'Div', block: 'div' }, { title: 'Pre', block: 'pre' }] }, { title: 'Alignment', items: [{ title: 'Left', icon: "alignleft", block: 'div', styles: { 'text-align': 'left' } }, { title: 'Center', icon: "aligncenter", block: 'div', styles: { 'text-align': 'center' } }, { title: 'Right', icon: "alignright", block: 'div', styles: { 'text-align': 'right' } }, { title: 'Justify', icon: "alignjustify", block: 'div', styles: { 'text-align': 'justify' } }] }
    ],
    setup: function (editor) {
        editor.addButton('mybutton', {
            text: '❝ ❞',
            icon: false,
            onclick: function () {
                editor.insertContent(`&nbsp;<b style="font-size:25px; font-weight:100;">&#10077;${editor.selection.getContent()}&#10078;</b>&nbsp;`);
            }
        });
    },
    menubar: false,

    toolbar_items_size: 'small',
    file_picker_types: 'file image media',

    init_instance_callback: function () {
        window.setTimeout(function () {
            $('#div').show();
        }, 1000);
    },

    file_picker_callback: function (callback, value, meta) {
        if (meta.filetype === 'media') {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'video/*');
            input.setAttribute('id', 'video-upload-link');
            input.setAttribute('name', 'uploaded-video');
            input.click();

            input.onchange = function () {
                const file = this.files[0];
                const reader = new FileReader();
                const fd = new FormData();
                const files = file;
                fd.append("file", files);
                fd.append('filetype', meta.filetype);

                var filename = "";
                jQuery.ajax({
                    url: "/Bilgilendirme/VideoYukle",
                    type: "post",
                    data: fd,
                    contentType: false,
                    processData: false,
                    async: false,
                    success: function (response) {
                        filename = response;
                    }
                });

                reader.onload = function () {
                    callback(filename);
                };
                reader.readAsDataURL(file);
            };
        } else if (meta.filetype === 'image') {

            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.setAttribute('multiple', 'true');
            input.click();
            var fileCount = 0;
            input.onchange = function () {
                var blobArray = [];
                var files = this.files;
                for (let i = 0; i < this.files.length; i++) {
                    const file = this.files[i];
                    const reader = new FileReader();
                    reader.onload = function () {
                        const id = 'blobid' + (new Date()).getTime();
                        const blobCache = tinymce.activeEditor.editorUpload.blobCache;
                        const base64 = reader.result.split(',')[1];
                        const blobInfo = blobCache.create(id, file, base64);
                        blobCache.add(blobInfo);
                        $.ajax({
                            url: "/Bilgilendirme/ResimYukle",
                            method: "POST",
                            data: { "base64": blobInfo.base64() },
                            async: false,
                            success: function (imagename) {
                                fileCount++;
                                blobArray.push(`/app-assets/Upload/Fotograf/Hizmet/${imagename}`);
                                if (fileCount === files.length - 1) {
                                    let htmlString = "<p>";
                                    blobArray.forEach(function (item) {
                                        htmlString += `<img src="${item}"  alt="" data-mce-src="..${item}" data-mce-selected="0"><br data-mce-bogus="1">`;
                                    });
                                    htmlString += "</p>";
                                    tinymce.activeEditor.execCommand('mceInsertContent', false, htmlString);
                                }
                            }
                        });
                        callback(blobInfo.blobUri(), { title: file.name });

                    };
                    reader.readAsDataURL(file);
                }
            };
        } else if (meta.filetype === 'file') {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'application/pdf,application/vnd.ms-excel');
            input.click();
            input.onchange = function () {
                const file = this.files[0];
                const reader = new FileReader();
                const fd = new FormData();
                const files = file;
                fd.append("file", files);
                fd.append('filetype', meta.filetype);

                var filename = "";
                jQuery.ajax({
                    url: "/Bilgilendirme/UploadFile",
                    type: "post",
                    data: fd,
                    contentType: false,
                    processData: false,
                    async: false,
                    success: function (response) {
                        filename = response;
                    }
                });

                reader.onload = function () {
                    callback(filename);
                };
                reader.readAsDataURL(file);
            };
        }
    }
});