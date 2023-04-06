var assetListVM;
$(function () {
    function formatMoney(price) {
        const formattedOutput = new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'TRY'
        });
        return formattedOutput.format(price);
    }

    assetListVM = {
        dt: null,
        init: function () {
            window.dt = $('#datatable').DataTable({
                "proccessing": true,
                "serverSide": true, 
                "ajax": {
                    "type": 'POST',
                    "url": '/Destek/Get',
                    "data": function (data) {
                        if (startDate != null) {
                            data.startDate = $('#startDate').val();
                            data.endDate = $('#endDate').val();
                        }
                    }
                },
                "columns": [
                    { "title": "Sıra", "data": "Id" },
                    { "title": "Tarih", "data": "Tarih", "searchable": true },
                    { "title": "TC", "data": "TC", "searchable": true },
                    {
                        "title": "Süt Miktar", "data": "SutMiktar", "searchable": true,
                        "render": function (data) {
                            return parseFloat(data).toFixed(2);
                        }
                    },
                    {
                        "title": "Destek Prim", "data": "DestekPrim", "searchable": true,
                        "render": function (data) {
                            return parseFloat(data).toFixed(2);
                        }
                    },
                    {
                        "title": "Destek Miktar", "data": "DestekMiktar",
                        "render": function (data) {
                            return '₺' + parseFloat(data).toFixed(4);
                        }
                    },
                    {
                        "title": "Eylemler",
                        "render": function (data, type, row) {
                            const inner =
                                `<a href="javascript:void(0);" class="delete-btn" title="Sil" data-id="${row.Id
                                    }"><i class="fa fa-trash-o"></i></a>`;
                            return inner;
                        }
                    }
                ],
                'columnDefs': [
                    {
                        'targets': [1, 2, 3, 4, 5],
                        'createdCell': function (td, cellData, rowData, row, col) {
                            $(td).attr('title', cellData);
                            if (col === 2) {
                                $(td).attr('id', `title-${rowData.Id}`);
                            }
                        }
                    }
                ],
                lengthMenu: [[10, 50, 100, 15000, -1], [10, 50, 100, 15000, "Hepsi"]],
                dom: 'Blfrtip',
                buttons: [{
                    extend: 'excel',
                    text: "Çıktı Excel <i class='ft-file - minus'></i>",
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5]
                    }
                }],
                "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                    const oSettings = this.fnSettings();
                    $("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
                    return nRow;
                },
                responsive: true
            });
        }
    };
    assetListVM.init();
});

$(document).ready(function () {
    $.fn.dataTableExt.afnFiltering.push(function (oSettings, aData) {
        const startDate = window.stringToDate($('#startDate').val());
        const endDate = window.stringToDate($('#endDate').val());
        const [day, month, year] = aData[2].split(".");
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

$('.ft-upload').on('click', function (e) {
    e.preventDefault();
    $('#importExcelModal').modal();
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
                window.location.href = `/Destek/Delete?id=${userid}`;
            } else {
                window.swal("İptal", "Veri güvende", "info");
            }
        });
});

$('.delete-btnall').on('click', function () {
    window.swal({
            title: "Emin misiniz?",
            text: " Tüm dataları silmek üzeresiniz!",
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
                window.location.href = `/Destek/DeleteSutAll`;
            } else {
                window.swal("İptal", "Veri güvende", "info");
            }
        });
});

//File Type check
$('#importForm').submit(function (submitEvent) {
    const filename = $("#form-group-input").val();
    var extension = filename.replace(/^.*\./, '');
    if (extension === filename) {
        extension = '';
    } else {
        extension = extension.toLowerCase();
        shownotification("Aktarım Başlatıldı! Lütfen bekleyiniz işlem tamamlandığında sayfa otomatik yenilenecektir...", "success");
    }
    switch (extension) {
        case 'xls':
            break;
        case 'xlsx':
            break;
        default:
            shownotification("Lütfen geçerli bir excel dosyası seçiniz...", "error");
            submitEvent.preventDefault();
    }
});