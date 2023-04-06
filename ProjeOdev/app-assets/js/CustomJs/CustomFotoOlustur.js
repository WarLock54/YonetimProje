$(document).ready(function () {
    $("#TurID option[value='2']").attr("disabled", "disabled");
    $("#TurID").val("1");
    $("#TurID").trigger("onchange");
});

function fileValidation() {
    const fileInput = document.getElementById('filePhoto');
    const filePath = fileInput.value;
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(filePath)) {
        shownotification("Fotoğraf için sadece .jpg,.jpeg,.png formatı desteklenmektedir...", "error");
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
    $('#uploader-text').html(filename);
}

$('#Olustur-Form').submit(function () {
    if ($('#GaleriPicUrl').val() === "") {
        if (document.getElementById("filePhoto").files.length === 0) {
            shownotification("Lütfen fotoğraf yükleyiniz...", "error");
            return false;
        } else {
            return true;
        }
    }
    return true;
});