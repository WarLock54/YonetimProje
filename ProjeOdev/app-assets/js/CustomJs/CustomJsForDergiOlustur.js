function TRfileValidation() {
    const fileInput = document.getElementById('filePhotoTR');
    const filePath = fileInput.value;
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(filePath)) {
        shownotification("Kapak için sadece .jpg,.jpeg,.png formatı desteklenmektedir...", "error");
        fileInput.value = '';
        return false;
    }
    return false;
}

function DosyafileValidation() {
    const fileInput = document.getElementById('TRDosya');
    const filePath = fileInput.value;
    const allowedExtensions = /(\.pdf)$/i;
    if (!allowedExtensions.exec(filePath)) {
        shownotification("Sadece PDF formatı desteklenmektedir...", "error");
        fileInput.value = '';
        return false;
    }
    return false;
}

var imageLoaderTR = document.getElementById('filePhotoTR');
imageLoaderTR.addEventListener('change', handleImageTR, false);

function handleImageTR(e) {
    const reader = new FileReader();
    if (reader.files && reader.files.type.match('image.*')) {
        reader.readAsDataURL(e.target.files[0]);
    }
    var filename = this.value;
    filename = filename.replace(/.*[\/\\]/, '');
    $('#uploader-text-TR').html(filename);
}
var TRDosyaLoader = document.getElementById('TRDosya');
TRDosyaLoader.addEventListener('change', handleTRDosya, false);

function handleTRDosya(e) {
    const reader = new FileReader();
    if (reader.files && reader.files.type.match('application/pdf.*')) {
            reader.readAsDataURL(e.target.files[0]);
    }
    var postfixtext;
    if (e.target.files.length > 1) {
        postfixtext = " dosya seçildi.";
    } else {
        postfixtext = " dosya seçildi.";
    }
    $('#uploader-text-Dosya').html(e.target.files.length + postfixtext);
}

$("#RemoveTRPhoto").on("change", function () {
    const Remove = $("#RemoveTRPhoto").is(":checked");
    if (Remove) {
        $("#FotografTR").val("");
    } else {
        $("#FotografTR").val($("#FotorgrafTROriginal").val());
    }
});

$("#RemoveTRDosya").on("change", function () {
    const Remove = $("#RemoveTRDosya").is(":checked");
    if (Remove) {
        $("#Dosya").val("");
    } else {
        $("#Dosya").val($("#FotorgrafDosyaOriginal").val());
    }
});

$('#Olustur-Form').submit(function () {
    if ($('#FotografTR').val() === "" || $('#Dosya').val() === "") {
        if (document.getElementById("filePhotoTR").files.length === 0) {
            shownotification("Dergi kapak fotoğrafı yükleyiniz..", "error");
            return false;
        }
        if (document.getElementById("TRDosya").files.length === 0) {
            shownotification("PDF belgesi yükleyiniz..", "error");
            return false;
        }
        else {
            return true;
        }
    }
    return true;
});