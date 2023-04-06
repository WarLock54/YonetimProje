function DosyafileValidation() {
    const fileInput = document.getElementById('AskiDosya');
    const filePath = fileInput.value;
    const allowedExtensions = /(\.pdf)$/i;
    if (!allowedExtensions.exec(filePath)) {
        shownotification("Sadece PDF formatı desteklenmektedir...", "error");
        fileInput.value = '';
        return false;
    }
    return false;
}

var TRDosyaLoader = document.getElementById('AskiDosya');
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
    $('#uploader-text-AskiDosya').html(e.target.files.length + postfixtext);
}

$("#RemoveTRDosya").on("change", function () {
    const Remove = $("#RemoveTRDosya").is(":checked");
    if (Remove) {
        $("#AskiDosya").val("");
    } else {
        $("#AskiDosya").val($("#FotorgrafDosyaOriginal").val());
    }
});

$('#Olustur-Form').submit(function () {
    if ($('#AskiDosyas').val() === '') {
        if ($('#Id').val() === 0) {
            shownotification("PDF belgesi yükleyiniz..", "error");
            return false;
        } else {
            return true;
        }
    }
    else {
        return true;
    }
});

$('#Olustur-Form').submit(function () {
    if (!($('#Id').val() > 0)) {
        if (document.getElementById("AskiDosya").files.length === 0) {
            shownotification("PDF belgesi yükleyiniz..", "error");
            return false;
        } else {
            return true;
        }
    }
    return true;
});

$('#NewAskiLink').on('click', function (e) {
    e.preventDefault();
    callToAskiFunction("yes");
});

$('#EditAskiLink').on('click', function (e) {
    e.preventDefault();
    if ($('#AskiID').val() === "") {
        shownotification("Değer seçiniz...", "error");
        return false;
    }
    callToAskiFunction("no");
    return false;
});

function callToAskiFunction(isNew) {
    var Title;
    var oldValue;
    var selectedAskiId;
    if (isNew === "yes") {
        Title = "";
        oldValue = "";
        selectedAskiId = "";
    } else {
        Title = "";
        oldValue = $('#AskiID option:selected').text();
        selectedAskiId = $('#AskiID').val();
    }
    window.swal({
        title: Title,
        text: "Değer adı ",
        type: "input",
        inputValue: oldValue,
        showCancelButton: true,
        closeOnConfirm: false,
        confirmButtonText: "Kaydet",
        cancelButtonText: "Iptal",
        animation: "slide-from-top",
        inputPlaceholder: "Ad..."
    },
    function (inputValue) {
        if (inputValue === false) return false;

        if (inputValue === "") {
            shownotification("Hata. Boş olamaz!");
            return false;
        }
        $.ajax({
            url: "/Aski/NewEditAskiByUser",
            method: 'post',
            data: { inputString: inputValue, selectedAskiId: selectedAskiId },
            success: function () {
                location.reload();
            },
            error: function () {
                shownotification("Hata. Bir şeyler ters gitti!!");
            }
        });
        return false;
    });
}