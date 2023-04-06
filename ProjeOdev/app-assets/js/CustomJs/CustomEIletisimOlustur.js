$('#MerkezID').on('change', function () {
    if (!$('#MerkezID').val() == "") {
        const merkezId = $('#MerkezID').val();
        $.ajax({
            method: 'get',
            url: `/EIletisim/GetKoopsByMerkezId/${merkezId}`,
            success: function (res) {
                var selectInput = "<select id='KoopID' name='KoopID' onchange='KulGet()' required class='form-control koop'><option value=''>-Seçiniz-</option>";
                selectInput += `<option value="0">Hepsi</option>`
                $.each(res, function (i, item) {
                    selectInput += `<option Value='${item.Value}'>${item.Text}</option>`;
                });
                selectInput += "</select>";
                $('#koopDiv').html(selectInput);
            }
        });
        $.ajax({
            method: 'get',
            url: `/EIletisim/GetKulsByMerkezId/${merkezId}`,
            success: function (res) {
                var selectInput = "<select name='MobilID' class='js-example-basic-multiple' multiple='multiple' required><option value=''>Mobil Kullanıcı</option>";
                selectInput += `<option value="0">Hepsi</option>`
                                                           
                $.each(res, function (i, item) {
                    selectInput += `<option Value='${item.Value}'>${item.Text}</option>`;
                });
                selectInput += "</select>";
                $('#kulDiv').html(selectInput);
                Multiple();
            }
        });
    } else {
        $('#koopDiv').html("<select name='KoopID' class='form-control koop' required><option value=''>-Seçiniz-</option></select>");
    }
    
});
function KulGet() {
    if (!$('#KoopID').val() == "") {
        const koopId = $('#KoopID').val();
        $.ajax({
            method: 'get',
            url: `/EIletisim/GetKulsByKoopId/${koopId}`,
            success: function (res) {
                debugger
                var selectInput = "<select name='MobilID' class='js-example-basic-multiple' multiple='multiple'><option value=''>Mobil Kullanıcı</option>";
                selectInput += `<option value="0">Hepsi</option>`
                $.each(res, function (i, item) {
                    selectInput += `<option Value='${item.Value}'>${item.Text}</option>`;
                });
                selectInput += "</select>";
                $('#kulDiv').html(selectInput);
                Multiple();
            }
        });
    } else {
        $('#kulDiv').html("<select name='MobilID' class='js-example-basic-multiple' multiple='multiple' required><option value=''>Mobil Kullanıcı</option></select>");
    }
};