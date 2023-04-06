$(document).ready(function () {
    $("#TurID option[value='1']").attr("disabled", "disabled");
    $("#TurID").val("2");
    $("#TurID").trigger("onchange");
});

function photoValidation() {
    const fileInput = document.getElementById('filePhoto');
    const filePath = fileInput.value;
    const allowedExtensions = /(\.jpg|\.png|\.jpeg)$/i;
    if (!allowedExtensions.exec(filePath)) {
        shownotification("Kapak için sadece .jpeg.jpg,.png formatı desteklenmektedir...", "error");
        fileInput.value = '';
        return false;
    }
    return false;
}

var imageLoader = document.getElementById('filePhoto');
imageLoader.addEventListener('change', handleImage, false);

function handleImage(e) {
    const reader = new FileReader();
    if (reader.files && reader.files.type.match('image.*')) {
        reader.readAsDataURL(e.target.files[0]);
    }
    var filename = this.value;
    filename = filename.replace(/.*[\/\\]/, '');
    $('#uploader-text-photo').html(filename);
}

$('#Olustur-Form').submit(function () {
    if ($('#CoverUrl').val() === "") {
        if (document.getElementById("filePhoto").files.length === 0) {
            shownotification("Lütfen video kapak yükleyiniz...", "error");
            return false;
        } else {
            return true;
        }
    }
    return true;
});

$('#Olustur-Form').submit(function () {
    const url = $('#Link').val();
    if (true) {
        const regExp = /^.*(embed\/).*/;
        const match = url.match(regExp);
        if (match && match[2].length === 11) {         
        } else {
            shownotification("Youtube embed link girilmesi zorunludur...", "error");
            return false;
        }
    }
    return true;
});