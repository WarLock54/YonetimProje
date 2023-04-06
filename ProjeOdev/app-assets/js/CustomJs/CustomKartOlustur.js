$('#MobilID').on('change', function () {
    if (!$('#MobilID').val() == "") {
        const userId = $('#MobilID').val();
        $.ajax({
            method: 'get',
            url: `/Kart/GetMobilKulaniciDetails/${userId}`,
            success: function (res) {
                $('#TC').val(res.tc);
                $('#KisiNo').val(res.kisiNo);
                $('#KoopNo').val(res.koopNo);

                $('#KoopID').val(res.koopId);
                $('#hiddenKoopID').val(res.koopId);

                $('#hiddenIlceID').val(res.ilceId);
                $('#IlceID').val(res.ilceId);

                $('#hiddenKoyID').val(res.koyId);
                $('#KoyID').val(res.koyId);
            }
        });
    } else {
        $('#TC').val("");
        $('#KisiNo').val("");
        $('#KoopNo').val("");

        $('#KoopID').val("");
        $('#hiddenKoopID').val("");

        $('#hiddenIlceID').val("");
        $('#IlceID').val("");

        $('#hiddenKoyID').val("");
        $('#KoyID').val("");
    }
});

$(".select2").select2({
    allowClear: true
});