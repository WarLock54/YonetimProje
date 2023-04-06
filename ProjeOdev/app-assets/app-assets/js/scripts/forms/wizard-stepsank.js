﻿// Wizard tabs with numbers setup
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
            case 2:
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
        form.validate().settings.ignore = ":disabled";
        return form.valid();
    },
    onFinished: function () {
        const form = {};
        form.id = $("#id").val();
        form.AnketBaslikTR = $("#AnketBaslikTR").val();
        form.AnketBaslikEN = $("#AnketBaslikEN").val();
        form.AnketBaslikAR = $("#AnketBaslikAR").val();
        form.Baslangic = $("#Baslangic").val();
        form.Bitis = $("#Bitis").val();
        form.ynSoruTR = $("#ynSoruTR").val();
        form.AnketTypeIdHtml = $("#AnketTypeIdHtml").val();
        form.AnketSubTypeIdHtml = $("#AnketSubTypeIdHtml").val();
        form.AnswerCountDropdown = $('#AnswerCountDropdown').val();

        form.csSoruTR = $("#csSoruTR").val();
        form.AnkCevaps_A_TR = $("#AnkCevaps-A-TR").val();
        form.AnkCevaps_B_TR = $("#AnkCevaps-B-TR").val();
        form.AnkCevaps_C_TR = $("#AnkCevaps-C-TR").val();
        form.AnkCevaps_D_TR = $("#AnkCevaps-D-TR").val();
        form.AnkCevaps_E_TR = $("#AnkCevaps-E-TR").val();
        form.AnkCevaps_F_TR = $("#AnkCevaps-F-TR").val();

        form.Yayin = $("#Yayin").is(":checked");
        $.ajax({
            type: "POST",
            url: "/Anket/Olustur",
            method: "POST",
            data: { "form": form },
            success: function () {
                window.location.href = "/Anket/List";
            },
            error: function () {
                window.location.href = "/Anket/List";
            }
        });
    }
});

// Initialize validation
$(".steps-validation").validate({
    ignore: 'input[type=hidden]',
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