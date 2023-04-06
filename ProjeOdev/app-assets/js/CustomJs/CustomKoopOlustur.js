$('#SehirID').on('change', function () {
    if (!$('#SehirID').val() == "") {
        const sehirId = $('#SehirID').val();
        $.ajax({
            method: 'get',
            url: `/Koop/GetIlcesBySehirId/${sehirId}`,
            success: function (res) {
                var selectInput = "<select id='IlceID' name='IlceID' onchange='KulGet()' class='form-control ilce' required><option value=''>İlçe</option>";
                $.each(res, function (i, item) {
                    selectInput += `<option Value='${item.Value}'>${item.Text}</option>`;
                });
                selectInput += "</select>";
                $('#ilceDiv').html(selectInput);
            }
        });
    } else {
        $('#ilceDiv').html("<select name='IlceID' class='form-control ilce' required><option value=''>İlçe</option></select>");
    }
});
$('#IlceID').on('change', function () {
    if (!$('#IlceID').val() == "") {
        const ilceId = $('#IlceID').val();
        $.ajax({
            method: 'get',
            url: `/Koop/GetKoysByIlceId/${ilceId}`,
            success: function (res) {
                var selectInput = "<select name='KoyID' class='form-control koy' required><option value=''>Köy/Mahalle</option>";
                $.each(res, function (i, item) {
                    selectInput += `<option Value='${item.Value}'>${item.Text}</option>`;
                });
                selectInput += "</select>";
                $('#koyDiv').html(selectInput);
            }
        });
    } else {
        $('#koyDiv').html("<select name='KoyID' class='form-control koy' required><option value=''>Köy/Mahalle</option></select>");
    }
});