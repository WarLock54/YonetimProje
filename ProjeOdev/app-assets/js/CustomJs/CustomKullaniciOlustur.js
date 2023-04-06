function fileValidation() {
    const fileInput = document.getElementById("ProfilePicUrls");
    const filePath = fileInput.value;
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(filePath)) {
        shownotification("Fotoğraf için sadece .jpg,.jpeg,.png formatı desteklenmektedir...", "error");
        fileInput.value = '';
        return false;
    }
    return false;
}

var imageLoader = document.getElementById("ProfilePicUrls");
imageLoader.addEventListener('change', handleImage, false);

function handleImage(e) {
    const reader = new FileReader();
    if (reader.files && reader.files.type.match('image.*')) {
        reader.readAsDataURL(e.target.files[0]);
    }
    var filename = this.value;
    filename = filename.replace(/.*[\/\\]/, '');
    $('#uploader-text-ProfilePicUrls').html(filename);
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

$('#BirimID').change(function () {
    if ($(this).val() === '4') {
        $('#Gorevs').show();
        $('.req').prop('required', true);
    }
    else {
        $('#Gorevs').hide();
        $('.req').prop('required', false);
    }
});

$(document).ready(function () {
    const DurumList = $("#BirimID").val();
    if (DurumList !== "") {
        const arryIds = DurumList;
        $("#BirimID").val(arryIds);
        $("#BirimID").trigger("change");
    }

    $('#BirimID').trigger("change");
    if ($(this).val() === '') {
        $('#Gorevs').hide();
    }

    $('#BirimID').trigger("change");
    if ($(this).val() === '4') {
        $('#Gorevs').show();
    }
});
$('#SehirID').on('change', function () {
    if (!$('#SehirID').val() == "") {
        const sehirId = $('#SehirID').val();
        $.ajax({
            method: 'get',
            url: `/Kullanici/GetKoopsBySehirId/${sehirId}`,
            success: function (res) {
                var selectInput = "<select id='KoopID' name='KoopID' class='form-control koop' required><option value=''>-Seçiniz-</option>";
                $.each(res, function (i, item) {
                    selectInput += `<option Value='${item.Value}'>${item.Text}</option>`;
                });
                selectInput += "</select>";
                $('#koopDiv').html(selectInput);
            }
        });
    } else {
        $('#koopDiv').html("<select name='KoopID' class='form-control koop' required><option value=''>-Seçiniz-</option></select>");
    }
});