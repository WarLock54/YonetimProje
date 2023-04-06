var assetListVM;
$(function () {
    assetListVM = {
        dt: null,
        init: function () {
            window.dt = $('#datatable').DataTable({
                "proccessing": true,
                "serverSide": true,
                "ajax": {
                    "url": '/SonKonusma/GetSonKonusma',
                    "data": function (data) {
                    }
                },
                "columns": [
                    { "title": "Sıra", "data": "Id" },
                    { "title": "Başlık", "data": "Baslik", "searchable": true },
                    {
                        "title": "Eylemler",
                        "render": function (data, type, row) {
                            const inner = `<a href="/SonKonusma/SonKonusmaEdit?id=${row.Id}" class="on-default edit-row" title="Güncelle" data-id="${row.Id
                                }"><i class="fa fa-pencil"></i></a>`;
                            return inner;
                        }
                    }
                ],
                "createdRow": function (row) {
                    $.each($('td', row), function () {
                        $(this).attr('class', "kisa");
                    });
                },
                'columnDefs': [
                    {
                        'targets': [1],
                        'createdCell': function (td, cellData, rowData, row, col) {
                            $(td).attr('title', cellData);
                            if (col === 1) {
                                $(td).attr('id', `title-${rowData.Id}`);
                            }
                        }
                    }
                ],
                "lengthMenu": [[10, 25, 50, 100], [10, 25, 50, 100]],
                "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                    const oSettings = this.fnSettings();
                    $("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
                    return nRow;
                },
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
                window.location.href = `/SonKonusma/SonKonusmaDelete?id=${userid}`;
            } else {
                window.swal("İptal", "Veri güvende", "info");
            }
        });
});
