$("#Baslangic").on("change", function () {
    const startDate = $(this).val();
    $("#Bitis").attr("min", startDate);
});

$(function () {
    if ($('#AnswerCount').val() === "2") {
        $('#AnswerCountDropdown').val('2');
        $('.TwoOptions').show();
        $('.TwoOptions input').attr('required', 'required');
        $('.ThreeOptions').hide();
        $('.ThreeOptions input').removeAttr('required');
        $('.FourOptions').hide();
        $('.FourOptions input').removeAttr('required');
        $('.FiveOptions').hide();
        $('.FiveOptions input').removeAttr('required');
        $('.SixOptions').hide();
        $('.SixOptions input').removeAttr('required');
    }
    else if ($('#AnswerCount').val() === "3") {
        $('#AnswerCountDropdown').val('3');
        $('.TwoOptions').show();
        $('.TwoOptions input').attr('required', 'required');
        $('.ThreeOptions').show();
        $('.ThreeOptions input').attr('required', 'required');
        $('.FourOptions').hide();
        $('.FourOptions input').removeAttr('required');
        $('.FiveOptions').hide();
        $('.FiveOptions input').removeAttr('required');
        $('.SixOptions').hide();
        $('.SixOptions input').removeAttr('required');
    }
    else if ($('#AnswerCount').val() === "4") {
        $('#AnswerCountDropdown').val('4');
        $('.TwoOptions').show();
        $('.TwoOptions input').attr('required', 'required');
        $('.ThreeOptions').show();
        $('.ThreeOptions input').attr('required', 'required');
        $('.FourOptions').show();
        $('.FourOptions input').attr('required', 'required');
        $('.FiveOptions').hide();
        $('.FiveOptions input').removeAttr('required');
        $('.SixOptions').hide();
        $('.SixOptions input').removeAttr('required');
    }
    else if ($('#AnswerCount').val() === "5") {
        $('#AnswerCountDropdown').val('5');
        $('.TwoOptions').show();
        $('.TwoOptions input').attr('required', 'required');
        $('.ThreeOptions').show();
        $('.ThreeOptions input').attr('required', 'required');
        $('.FourOptions').show();
        $('.FourOptions input').attr('required', 'required');
        $('.FiveOptions').show();
        $('.FiveOptions input').attr('required', 'required');
        $('.SixOptions').hide();
        $('.SixOptions input').removeAttr('required');
    }
    else if ($('#AnswerCount').val() === "6") {
        $('#AnswerCountDropdown').val('6');
        $('.TwoOptions').show();
        $('.TwoOptions input').attr('required', 'required');
        $('.ThreeOptions').show();
        $('.ThreeOptions input').attr('required', 'required');
        $('.FourOptions').show();
        $('.FourOptions input').attr('required', 'required');
        $('.FiveOptions').show();
        $('.FiveOptions input').attr('required', 'required');
        $('.SixOptions').show();
        $('.SixOptions input').attr('required', 'required');

    } else {
        $('#AnswerCountDropdown').val('4');
        $('.TwoOptions').show();
        $('.TwoOptions input').attr('required', 'required');
        $('.ThreeOptions').show();
        $('.ThreeOptions input').attr('required', 'required');
        $('.FourOptions').show();
        $('.FourOptions input').attr('required', 'required');
        $('.FiveOptions').hide();
        $('.FiveOptions input').removeAttr('required');
        $('.SixOptions').hide();
        $('.SixOptions input').removeAttr('required');
    }

    $('#AnswerCountDropdown').change(function () {
        switch ($('#AnswerCountDropdown').val()) {
            case '2':
                $('.TwoOptions').show();
                $('.TwoOptions input').attr('required', 'required');
                $('.ThreeOptions').hide();
                $('.ThreeOptions input').removeAttr('required');
                $('.FourOptions').hide();
                $('.FourOptions input').removeAttr('required');
                $('.FiveOptions').hide();
                $('.FiveOptions input').removeAttr('required');
                $('.SixOptions').hide();
                $('.SixOptions input').removeAttr('required');
                break;
            case '3':
                $('.TwoOptions').show();
                $('.TwoOptions input').attr('required', 'required');
                $('.ThreeOptions').show();
                $('.ThreeOptions input').attr('required', 'required');
                $('.FourOptions').hide();
                $('.FourOptions input').removeAttr('required');
                $('.FiveOptions').hide();
                $('.FiveOptions input').removeAttr('required');
                $('.SixOptions').hide();
                $('.SixOptions input').removeAttr('required');
                break;
            case '4':
                $('.TwoOptions').show();
                $('.TwoOptions input').attr('required', 'required');
                $('.ThreeOptions').show();
                $('.ThreeOptions input').attr('required', 'required');
                $('.FourOptions').show();
                $('.FourOptions input').attr('required', 'required');
                $('.FiveOptions').hide();
                $('.FiveOptions input').removeAttr('required');
                $('.SixOptions').hide();
                $('.SixOptions input').removeAttr('required');
                break;
            case '5':
                $('.TwoOptions').show();
                $('.TwoOptions input').attr('required', 'required');
                $('.ThreeOptions').show();
                $('.ThreeOptions input').attr('required', 'required');
                $('.FourOptions').show();
                $('.FourOptions input').attr('required', 'required');
                $('.FiveOptions').show();
                $('.FiveOptions input').attr('required', 'required');
                $('.SixOptions').hide();
                $('.SixOptions input').removeAttr('required');
                break;
            case '6':
                $('.TwoOptions').show();
                $('.TwoOptions input').attr('required', 'required');
                $('.ThreeOptions').show();
                $('.ThreeOptions input').attr('required', 'required');
                $('.FourOptions').show();
                $('.FourOptions input').attr('required', 'required');
                $('.FiveOptions').show();
                $('.FiveOptions input').attr('required', 'required');
                $('.SixOptions').show();
                $('.SixOptions input').attr('required', 'required');
                break;
            default:
                $('.TwoOptions').show();
                $('.TwoOptions input').attr('required', 'required');
                $('.ThreeOptions').show();
                $('.ThreeOptions input').attr('required', 'required');
                $('.FourOptions').show();
                $('.FourOptions input').attr('required', 'required');
                $('.FiveOptions').hide();
                $('.FiveOptions input').removeAttr('required');
                $('.SixOptions').hide();
                $('.SixOptions input').removeAttr('required');
                break;
        }
    });
});

function AjaxCallForAnketSubTypeList(typeId) {
    $.ajax({
        method: "get",
        url: "/Anket/GetAnketSubTypeDropDown/",
        data: { typeId: typeId },
        dataType: "json",
        success: function (response) {
            var responseString = "";
            if (jQuery.isEmptyObject(response)) {
                responseString += "<option value='0'>Bulunamadı!</option>";
            } else {
                let i;
                for (i in response) {
                    if (response.hasOwnProperty(i)) {
                        responseString += `<option value='${response[i].Value}'>${response[i].Text}</option>`;
                    }
                }
            }
            $("#AnketSubTypeIdHtml").html(responseString);
            if ($("#AnketSubTypeId").val()) {
                $("#AnketSubTypeIdHtml").val($("#AnketSubTypeId").val());
            }
            $("#AnketSubTypeIdHtml").attr('required', 'required');
            $("#AnketSubTypeIdDiv").show();
        }
    });
}

function SelectedAnketType() {
    const anketTypeId = $("#AnketTypeIdHtml").val();
    switch (anketTypeId) {
        case "5":
            $("#AnketSubTypeIdHtml").removeAttr("required");
            $("#AnketSubTypeIdDiv").hide();
            break;
        case "2":
            AjaxCallForAnketSubTypeList("2");
            break;
        case "4":
            AjaxCallForAnketSubTypeList("4");
            break;
        default:
            $("#AnketSubTypeIdHtml").removeAttr("required");
            $("#AnketSubTypeIdDiv").hide();
            break;
    }
}

$(function () {
    SelectedAnketType();
    if ($("#AnketTypeId").val()) {
        const anketTypeId = $('#AnketTypeId').val();
        $("#AnketTypeIdHtml").val(anketTypeId);
        switch (anketTypeId) {
            case "5":
                $("#AnketSubTypeIdHtml").removeAttr("required");
                $("#AnketSubTypeIdDiv").hide();
                break;
            case "2":
                AjaxCallForAnketSubTypeList("2");

                break;
            case "4":
                AjaxCallForAnketSubTypeList("4");
                break;
            default:
                $("#AnketSubTypeIdHtml").removeAttr("required");
                $("#AnketSubTypeIdDiv").hide();
                break;
        }
    }
});

$("#AnketTypeIdHtml").change(function () {
    SelectedAnketType();
});