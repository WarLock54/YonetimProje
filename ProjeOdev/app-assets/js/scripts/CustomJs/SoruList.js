var assetListVM;
$(function () {
    assetListVM = {
        dt: null,
        init: function () {
            window.dt = $('#datatable').DataTable({
                "processing": true,
                "serverSide": true,
                "ajax": {
                    url: '/AdminSoruPaneli/GetSoru',

                },
                "columns": [
                    { "title": "Id", "data": "Id" },
                    { "title": "SoruAciklamasi", "data": "SoruAciklamasi", searchable: true },
                    {
                        "title": "Eylemler",
                        "render": function (data, type, row) {
                            const inner = `<a href="javascript:void(0);" class="on-default edit-row" title="Düzenle"><i class="fa fa-pencil"></i></a>
                                        <a href="/AdminSoruPaneli/SoruSil?id=${row.Id}" class="delete-btn" title="Sil" data-id="${row.Id}"><i class="fa fa-trash-o"></i> </a
`;
                            return inner;
                        }
                    }
                ],
                "createdRow": function (row) {
                    $.each($(`td`, row), function () {
                        $(this).attr(`class`, `kisa`);
                    });
                },
                "columnDefs": [{
                    'targets': [1],
                    "createdCell": function (td, cellData, rowData, row, col) {
                        $(td).attr('title', cellData);

                        if (col === 3) {
                            $(td).attr('id', `title-${rowData.Id}`);
                        }
                    }
                }],
                "lengthMenu": [[10, 25, 50, 100], [10, 25, 50, 100]],
                /*fnrowcall back de sıkıntı var onun yerine yazıldı*/
                responsive: true
            });
        }
    }
    assetListVM.init();
});

$('#datatable').on('click', '.delete-btn', function () {
    const deleteBtn = $(this);
    var userid = deleteBtn.data('id');
    const title = $(`#title-${userid}`).text();
    window.swall({
        title: "emin misiniz",
        text: title + "bilgisini silmek üzerisiniz!",
        icon: "warning",
        buttons: {
            cancel: {
                text: "Hayır ,iptal!",
                value: null,
                visible: true,
                className: "",
                closeModal: false
            },
            confirm: {
                text: "Evet ,sil",
                value: true,
                visible: true,
                className: "",
                closeModal: false
            }
        }
    }).then((isConfirm) => {
        if (isConfirm) {
            window.location.href = `/AdminSoruPaneli/SoruSil?id=${row.Id}`;
        }
        else {
            window.swal("İptal", "Veri güvende", "info");
        }

    });
});
