
var assetListVM;
$(function (){
    assetListVM = {
        dt: null,
        init: function () {
           
            window.dt = $('#datatable').DataTable({
                "processing": true,
                "serverSide": true,
                "ajax": {
                    url: "/AdminSoruPaneli/GetSoru",             
                },
                "columns": [
                    { "title": "Id", "data": "SıraNo" },
                    { "title": "a", "data": "A" },
                    { "title": "b", "data": "B" },
                    { "title": "c", "data": "C" },
                    { "title": "d", "data": "D" },
                    { "title": "SoruAciklamasi", "data": "SoruAciklamasi", searchable: true },
                    {
                        "title": "Eylemler",
                        "render": function (data, type, row) {
                            const inner = `<a href="/AdminSoruPaneli/Guncelle?id=${row.Id}" class="on-default edit-row" title="Düzenle">Düzenle</a>
                                        <a href="" class="delete-btn" title="Sil" data-id="${row.Id}"></a>
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
                    'targets': [1,2,3,4,5,6],
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

