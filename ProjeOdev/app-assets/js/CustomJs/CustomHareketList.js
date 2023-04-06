var assetListVM;
$(function () {
    assetListVM = {
        dt: null,
        init: function () {
            window.dt = $('#datatable').DataTable({
                "proccessing": true,
                "serverSide": true,
                "ajax": {
                    "url": '/Anlasmali/Get',
                    "data": function (data) {
                        if (startDate !== null || endDate !== null) {
                            data.startDate = $('#startDate').val();
                            data.endDate = $('#endDate').val();
                        }
                    }
                },
                "columns": [
                    { "title": "Sıra", "data": "Id" },
                    { "title": "Firma Adı", "data": "FirmaId", "searchable": true },
                    { "title": "Mobil Kullanıcı", "data": "MobilKullId", "searchable": true },
                    { "title": "Tutar", "data": "Tutar", "searchable": true },
                    { "title": "Oran", "data": "Oran", "searchable": true },
                    { "title": "Tarih", "data": "Tarih", "searchable": true, "stitle:": "Tarih" },
                    {
                        "title": "Eylemler",
                        "render": function (data, type, row) {
                            const inner = `<i class="fa fa-pencil"></i></a>
                            <a href="javascript:void(0);" class="delete-btn" title="Sil" data-Id="${row.Id}"><i class="fa fa-trash-o"></i></a>`;
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
                        'targets': [1, 2, 3, 4, 5],
                        'createdCell': function (td, cellData, rowData, row, col) {
                            $(td).attr('title', cellData);
                            if (col === 3) {
                                $(td).attr('Id', `title-${rowData.Id}`);
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
                dom: 'Blfrtip',
                buttons: [{
                    extend: 'excel',
                    text: "Çıktı Excel <i class='ft-file - minus'></i>",
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5]
                    }
                }],
                responsive: true
            });
        }
    }
    assetListVM.init();
});

$(document).ready(function () {
    $.fn.dataTableExt.afnFiltering.push(function (oSettings, aData) {
        const startDate = window.stringToDate($('#startDate').val());
        const endDate = window.stringToDate($('#endDate').val());
        const [day, month, year] = aData[1].split(".");
        const dateColumn = new Date(year, month - 1, day);
        if ((startDate === undefined && endDate === undefined) ||
            (startDate <= dateColumn && endDate === undefined) ||
            (endDate >= dateColumn && startDate === undefined) ||
            (startDate <= dateColumn && endDate >= dateColumn)) {

            return true;
        } else {
            return false;
        }
    });
});

$('#startDate,#endDate').on('change', function () {
    dt.draw();
});

$('#datatable').on('click', '.delete-btn', function () {
    const deleteBtn = $(this);
    var userId = deleteBtn.data('Id');
    const title = $(`#title-${userId}`).text();
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
                window.location.href = `/Anlasmali/HareketDelete?Id=${userId}`;
            } else {
                window.swal("İptal", "Veri güvende", "info");
            }
        });
});