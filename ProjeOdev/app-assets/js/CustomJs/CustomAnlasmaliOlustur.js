function fileValidationK() {
    const fileInput = document.getElementById('Kapaks');
    const filePath = fileInput.value;
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(filePath)) {
        shownotification("Fotoğraf için sadece .jpg,.jpeg,.png formatı desteklenmektedir...", "error");
        fileInput.value = '';
        return false;
    }
    return false;
}

var imageLoader = document.getElementById('Kapaks');
imageLoader.addEventListener('change', handleImageK, false);

function handleImageK(e) {
    const reader = new FileReader();
    if (reader.files && reader.files.type.match('image.*')) {
        reader.readAsDataURL(e.target.files[0]);
    }
    var filename = this.value;
    filename = filename.replace(/.*[\/\\]/, '');
    $('#uploader-text-Kapak').html(filename);
}

$("#Olustur-Form").submit(function () {
    return true;
});

function fileValidationP() {
    const fileInput = document.getElementById('PDFs');
    const filePath = fileInput.value;
    const allowedExtensions = /(\.pdf)$/i;
    if (!allowedExtensions.exec(filePath)) {
        shownotification("PDF için sadece .pdf formatı desteklenmektedir...", "error");
        fileInput.value = '';
        return false;
    }
    return false;
}

var imageLoaderr = document.getElementById('PDFs');
imageLoaderr.addEventListener('change', handleImage, false);

function handleImage(e) {
    const reader = new FileReader();
    if (reader.files && reader.files.type.match('image.*')) {
        reader.readAsDataURL(e.target.files[0]);
    }
    var filename = this.value;
    filename = filename.replace(/.*[\/\\]/, '');
    $('#uploader-text-PDF').html(filename);
}

$("#Olustur-Form").submit(function () {
    return true;
});