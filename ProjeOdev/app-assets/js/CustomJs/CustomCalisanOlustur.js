function fileValidation() {
    const fileInput = document.getElementById('Resims');
    const filePath = fileInput.value;
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(filePath)) {
        shownotification("Fotoğraf için sadece .jpg,.jpeg,.png formatı desteklenmektedir...", "error");
        fileInput.value = '';
        return false;
    }
    return false;
}

var imageLoader = document.getElementById('Resims');
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

$("#Olustur-Form").submit(function () {
    if ($('#Resim').val() === "") {
        if (document.getElementById("Resims").files.length === 0) {
            shownotification("Lütfen üye fotoğrafı yükleyiniz..", "error");
            return false;
        } else {
            return true;
        }
    }
    return true;
});

