

// Wizard tabs with numbers setup
$(".number-tab-steps").steps({
    headerTag: "h6",
    bodyTag: "fieldset",
    transitionEffect: "fade",
    titleTemplate: '<span class="step">#index#</span> #title#',
    labels: {
        finish: 'Submit'
    },
    onFinished: function () {
        $("#wizardForm").submit();
    }
});

// Wizard tabs with icons setup
$(".icons-tab-steps").steps({
    headerTag: "h6",
    bodyTag: "fieldset",
    transitionEffect: "fade",
    titleTemplate: '<span class="step">#index#</span> #title#',
    labels: {
        finish: 'Gönder'
    },
    onFinished: function () {
        $("#wizardForm").submit();
    }
});

// Vertical tabs form wizard setup
$(".vertical-tab-steps").steps({
    headerTag: "h6",
    bodyTag: "fieldset",
    transitionEffect: "fade",
    stepsOrientation: "vertical",
    titleTemplate: '<span class="step">#index#</span> #title#',
    labels: {
        finish: 'Submit'
    },
    onFinished: function () {
        $("#wizardForm").submit();
    }
});

// Validate steps wizard

// Show form
var form = $(".steps-validation").show();

$(".steps-validation").steps({
    headerTag: "h6",
    bodyTag: "fieldset",
    transitionEffect: "fade",
    titleTemplate: '<span class="step">#index#</span> #title#',
    labels: {
        finish: 'Tamamla'
    },
    onStepChanging: function (event, currentIndex, newIndex) {
        //set lables
        switch (newIndex) {
            case 0:
                {
                    break;
                }

            case 1:
                {
                    break;
                }

            default:
                break;
        }
        // Allways allow previous action even if the current form is not valid!
        if (currentIndex > newIndex) {
            return true;
        }
        // Forbid next action on "Warning" step if the user is to young
        if (newIndex === 3 && Number($("#age-2").val()) < 18) {
            return false;
        }
        // Needed in some cases if the user went back (clean up)
        if (currentIndex < newIndex) {
            // To remove error styles
            form.find(`.body:eq(${newIndex}) label.error`).remove();
            form.find(`.body:eq(${newIndex}) .error`).removeClass("error");
        }
        form.validate().settings.ignore = ":disabled,:hidden";
        return form.valid();
    },
    onFinishing: function () {
        tinyMCE.triggerSave();
        form.validate().settings.ignore = ":disabled";
        return form.valid();
    },

    onFinished: function () {
        $.each($("img"), function () {
        });
        const formdata = new FormData();
        let photo = document.getElementById("Resims");
        for (var i = 0; i < photo.files.length; i++) {
            formdata.append("Resims", photo.files[i]);
        }
        const form = {};
        form.Id = $("#Id").val();
        form.Ad = $("#Ad").val();
        form.Telefon = $("#Telefon").val();
        form.Faks = $("#Faks").val();
        form.Eposta = $("#Eposta").val();
        form.Adres = $("#Adres").val();
        form.Harita = $("#Harita").val();
        form.Texteditor = $("#Texteditor").val();
        formdata.append("form", JSON.stringify(form));
        $.ajax({
            type: "POST",
            url: "/Sube/Olustur",
            method: "POST",
            data: formdata,
            dataType: 'json',
            contentType: false,
            processData: false,
            success: function () {
                window.location.href = "/Sube/List";
            },
            error: function () {
                window.location.href = "/Sube/List";
            }
        });
    }
});

// Initialize validation
$(".steps-validation").validate({
    ignore: 'input[type=hidden]', // ignore hidden fields
    errorClass: 'danger',
    successClass: 'success',
    highlight: function (element, errorClass) {
        $(element).removeClass(errorClass);
    },
    unhighlight: function (element, errorClass) {
        $(element).removeClass(errorClass);
    },
    errorPlacement: function (error, element) {
        error.insertAfter(element);
    },
    rules: {
        email: {
            email: true
        }
    }
});