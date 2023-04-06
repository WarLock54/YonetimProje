var table;
$(document).ready(function () {
    table = $('#datatable').DataTable({
        "fnRowCallback": function (nRow, aData, iDisplayIndex) {
            const oSettings = this.fnSettings();
            $("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
            return nRow;
        },
        responsive: true
    });
});

$('#datatable').on('click', '.delete-btn', function () {
    const deleteBtn = $(this);
    var userid = deleteBtn.data('id');
    const title = deleteBtn.closest('tr').find('title').text();
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
                closeModal: false
            }
        }
    })
        .then((isConfirm) => {
            if (isConfirm) {
                window.location.href = `/Hakkimizda/OrtaklarDelete?id=${userid}`;
            } else {
                window.swal("İptal", "Veri güvende", "info");
            }
        });
});