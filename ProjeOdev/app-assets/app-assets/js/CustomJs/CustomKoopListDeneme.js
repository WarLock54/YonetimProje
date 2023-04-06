var assetListVM;
$(function () {
    assetListVM = {
        dt: null,
        init: function () {
            window.dt = $('#datatable').DataTable({
                "processing": true,
                "serverSide": true,
                "ajax": {
                    url: '/MobilKullanici/GetKoop',
                  
                },
                "columns": [
                    { "title": "Sıra", "data": "SiraNo" },
                    { "title": "OrtakNo", "data": "OrtakNo", searchable: true },
                    { "title": "Ad Soyad", "data": "AdSoyad", searchable: true },
                    { "title": "TC NO", "data": "TC", searchable: true },
                    { "title": "Kooperatif", "data": "Kooperatif", searchable: true },
                    { "title": "İlçe", "data": "Ilce", searchable: true },
                    { "title": "İl", "data": "Il", searchable: true },
                   
                    {
                        "title": "Eylemler",
                        "render": function (data, type, row) {
                            const inner = `<a href="javascript:void(0);" class="on-default edit-row" title="Düzenle"><i class="fa fa-pencil"></i></a>
                                        <a href="/MobilKullanici/KoopSil?id=${userid}" class="delete-btn" title="Sil" data-id="${row.Id}"> <i class="fa fa-trash-o"></i> </a>

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
                    'targets': [1, 2, 3,4,5,6],
                    "createdCell": function (td, cellData, rowData, row, col) {
                        $(td).attr('title', cellData);
                        /*columna tekrardan bak...*/
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
            window.location.href = `/MobilKullanici/KoopSil?id=${userid}`;
        }
        else {
            window.swal("İptal", "Veri güvende", "info");
        }

    });
});
