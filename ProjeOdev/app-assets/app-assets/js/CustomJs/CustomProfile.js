function fileValidation() {
    const fileInput = document.getElementById('ProfilePicUrls');
    const filePath = fileInput.value;
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(filePath)) {
        shownotification("Fotoğraf için sadece .jpg,.jpeg,.png formatı desteklenmektedir...", "error");
        fileInput.value = '';
        return false;
    }
    return false;
}

var imageLoader = document.getElementById('ProfilePicUrls');
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

$("#menu").select2({
    allowClear: true
});

$(function () {
    $("#showpasword").mouseover(function () {
        $(".showpasword").prop("type", "text");
    });
    $("#showpasword").mouseout(function () {
        $(".showpasword").prop("type", "password");
    });
});

$('#Olustur-Form').submit(function () {
    if ($('#ProfilePicUrl').val() === "") {
        if (document.getElementById("ProfilePicUrls").files.length === 0) {
            shownotification("Lütfen profil fotoğrafı yükleyiniz..", "error");
            return false;
        } else {
            return true;
        }
    }
    return true;
});