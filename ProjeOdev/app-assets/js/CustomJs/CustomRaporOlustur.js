function fileValidation() {
    const fileInput = document.getElementById("ProfilePicUrls");
    const filePath = fileInput.value;
    const allowedExtensions = /(\.pdf)$/i;
    if (!allowedExtensions.exec(filePath)) {
        shownotification("PDF için sadece .pdf formatı desteklenmektedir...", "error");
        fileInput.value = '';
        return false;
    }
    return false;
}

var imageLoader = document.getElementById("Dosyas");
imageLoader.addEventListener('change', handleImage, false);

function handleImage(e) {
    const reader = new FileReader();
    if (reader.files && reader.files.type.match('image.*')) {
        reader.readAsDataURL(e.target.files[0]);
    }
    var filename = this.value;
    filename = filename.replace(/.*[\/\\]/, '');
    $('#uploader-text-Dosyas').html(filename);
}

$('#Olustur-Form').submit(function () {
    if ($('#Dosya').val() === "") {
        if (document.getElementById("Dosyas").files.length === 0) {
            shownotification("Lütfen pdf dosyası yükleyiniz..", "error");
            return false;
        } else {
            return true;
        }
    }
    return true;
});