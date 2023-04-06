$(".modalCloseBtn").click(function () {
    window.swal({
        title: "Emin misin?",
        text: "Kaydedilmemiş değişiklikleriniz olabilir?",
        icon: "warning",
        buttons: {
            cancel: {
                text: "Hayır, iptal!",
                value: null,
                visible: true,
                className: "",
                closeModal: false
            },
            confirm: {
                text: "Evet",
                value: true,
                visible: true,
                className: "",
                closeModal: false,
                showCancelButton: true
            }
        }
    })
        .then((isConfirm) => {
            if (isConfirm) {
                $("#myModal").modal("hide");
                window.swal("Kayıt Yapılmadı", "Verileriniz kaydolmadı", "error");
            }
            else {
                window.swal("İptal", "Veri güvende", "info");
            }
        });
});
// Kapak
function fileValidations() {
    const fileInput = document.getElementById("Kapaks");
    const filePath = fileInput.value;
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(filePath)) {
        shownotification("Fotoğraf için sadece .jpg,.jpeg,.png formatı desteklenmektedir...", "error");
        fileInput.value = '';
        return false;
    }
    return false;
}

var imageLoader1 = document.getElementById("Kapaks");
imageLoader1.addEventListener('change', handleImage1, false);

function handleImage1(e) {
    const reader = new FileReader();
    if (reader.files && reader.files.type.match('image.*')) {
        reader.readAsDataURL(e.target.files[0]);
    }
    var filename = this.value;
    filename = filename.replace(/.*[\/\\]/, '');
    $('#Kapak-text').html(filename);
}
$("#InlineEditorModalLink").on("click", function (event) {
    event.preventDefault();
    $("#TextEditorTRPopUpDiv").html(tinymce.get('texteditorTR').getContent());
    TinyMceInitForPopup('div #TextEditorTRPopUpDiv');
    $("#myModal").modal();
});

$("#saveModal").on("click", function () {
    tinymce.get('texteditorTR').setContent($("#TextEditorTRPopUpDiv").html());
    $("#myModal").modal('toggle');
});

function TinyMceInitForPopup(Selector) {
    tinymce.init({
        selector: Selector,
        inline: true,
        plugins: [
            "advlist autolink autosave link image lists charmap print preview hr anchor pagebreak",
            "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
            "table contextmenu directionality emoticons template textcolor paste fullpage textcolor colorpicker textpattern code image imagetools"
        ],
        toolbar: 'code | mybutton undo redo | image media | styleselect | bold italic | alignleft aligncenter alignright alignjustify fontselect fontsizeselect | bullist numlist outdent indent | link',
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
                    console.log(editor.selection);
                    editor.insertContent(`&nbsp;<b style="font-size:25px; font-weight:100;">&#10077;${editor.selection.getContent()}&#10078;</b>&nbsp;`);
                }
            });
        },
        menubar: false,
        images_upload_url: 'http://localhost:51814/Haber/Olustur',

        images_upload_handler: function (blobInfo, success) {

            $.ajax({
                url: "/Haber/UploadImage",
                method: "POST",
                data: { "base64": blobInfo.base64() },
                async: false,
                success: function (imagename) {
                    success(`/app-assets/Upload/Fotograf/Haber/${imagename}`);
                }
            });
        },
        toolbar_items_size: 'small',
        file_picker_types: 'media',

        init_instance_callback: function () {
            window.setTimeout(function () {
                $("#div").show();
            }, 1000);
        },

        file_picker_callback: function (callback, value, meta) {

            if (meta.filetype === 'media') {
                const input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'video/mp4*');
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
                        url: "/Haber/UploadVideo",
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
}
$(document).on('focusin', function (e) {
    if ($(e.target).closest(".mce-window, .moxman-window").length) {
        e.stopImmediatePropagation();
    }
});

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
                console.log(editor.selection);
                editor.insertContent(`&nbsp;<b style="font-size:25px; font-weight:100;">&#10077;${editor.selection.getContent()}&#10078;</b>&nbsp;`);
            }
        });
    },
    menubar: false,
    images_upload_url: 'http://localhost:51814/Haber/Olustur',

    images_upload_handler: function (blobInfo, success) {
        $.ajax({
            url: "/Haber/UploadImage",
            method: "POST",
            data: { "base64": blobInfo.base64() },
            async: false,
            success: function (imagename) {
                success(`/app-assets/Upload/Fotograf/Haber/${imagename}`);
            }
        });
    },
    toolbar_items_size: 'small',
    file_picker_types: 'media',

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

                if (dz.getQueuedFiles().length > 0) {
                    dz.processQueue();
                } else {
                    var formdata = new FormData();
                    formdata.append("kapak", document.getElementById("Kapaks").files[0]);
                    formdata.append("form", JSON.stringify(form));
                    $.ajax({
                        type: "POST",
                        url: "/Haber/Olustur",
                        method: "POST",
                        data: formdata,
                        dataType: 'json',
                        contentType: false,
                        processData: false,
                        success: function () {

                            window.location.href = "/Haber/List";
                        },
                        error: function () {
                            window.location.href = "/Haber/List";
                        }
                    });
                }
            };
            this.on('sendingmultiple', function (data, xhr, formData) {
                formData.append("kapak", document.getElementById("Kapaks").files[0]);
                formData.append("form", JSON.stringify(form));

            });
            this.on('success', function (file, response) {
                window.location.href = "/Haber/List";
            });
        }
    }
});
    
