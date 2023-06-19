﻿
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
                    { "title": "SıraNo", "data": "Id" },
                    { "title": "SoruAciklamasi", "data": "SoruAciklamasi", searchable: true },
                    { "title": "a", "data": "A", searchable: true },
                    {
                        "title": "Eylemler",
                        "render": function (data, type, row) {
                            const inner = `<a href="/AdminSoruPaneli/SoruGuncelle?id=${row.Id}" ><button class="btn btn-info">Show Display</button></a>
            
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
                    'targets': [1,2,3],
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

