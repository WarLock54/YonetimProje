var table;
$(function () {
    $('.js-example-basic-multiple').select2({
        placeholder: "İlçe ...",
        allowClear: true
    });
    table = $('#datatable').DataTable({
        dom: 'Bfrtip',
        buttons: [{
            extend: 'excel',
            text: "Çıktı Excel <i class='ft-file - minus'></i>",
            exportOptions: {
                columns: [0, 1, 2, 3, 4]
            }
        }],
        "fnRowCallback": function (nRow, aData, iDisplayIndex) {
            var oSettings = this.fnSettings();
            $("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
            return nRow;
        },
        responsive: true
    });
});

$.fn.dataTable.ext.search.push(function (settings, data) {
    const selectedIlce = $(".js-example-basic-multiple option:selected").text();
    const ilceData = data[3];
    if (selectedIlce.indexOf(ilceData) !== -1 || selectedIlce === "") {
        return true;
    }
    return false;
});

$('#ilceId').on('change', function () {
    table.draw();
});

$('.ft-upload').on('click', function (e) {
    e.preventDefault();
    $('#importExcelModal').modal();
});

$('#datatable').on('click', '.delete-btn', function () {
    const deleteBtn = $(this);
    var userid = deleteBtn.data('id');
    const title = deleteBtn.closest('tr').find('.title').text();
    window.swal({
        title: "Emin misiniz?",
        text: title + " datasını silmek üzeresiniz!",
        icon: "warning",
        buttons: {
            cancel: {
                text: "Hayır, iptal!",
                value: null,
                visible: true,
                className: "",
                closeModal: false
            },
            confirm: {
                text: "Evet, sil!",
                value: true,
                visible: true,
                className: "",
                closeModal: false,
                showCancelButton: true
            }
        }
    })
        .then((isConfirm) => {
            if (isConfirm) {
                window.location.href = `/Koop/Delete?id=${userid}`;
            } else {
                window.swal("İptal", "Veri güvende", "info");
            }
        });
});

    