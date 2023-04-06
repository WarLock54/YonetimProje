var assetListVM;
$(function () {
    assetListVM = {
        dt: null,
        init: function () {
            $('.js-example-basic-multiple').select2({
                placeholder: "İlçe ...",
                allowClear: true
            });
            window.dt = $('#datatable').DataTable({
                "proccessing": true,
                "serverSide": true,
                "ajax": {
                    "type": 'POST',
                    "url": '/Aski/Get',
                    "data": function (data) {
                        if (startDate !== null) {
                            data.startDate = $('#startDate').val();
                            data.endDate = $('#endDate').val();
                        }
                        if (window.ilceId != null) {
                            data.ilceIds = $('#ilceId').val().toString();
                        }
                    }
                },
                "columns": [
                    { "title": "Sıra", "data": "Id" },
                    { "title": "Tarih", "data": "Tarih", "searchable": true, "stitle:": "Tarih" },
                    { "title": "Liste Başlık", "data": "AskiID", "searchable": true },
                    { "title": "İlçe", "data": "IlceID", "searchable": true },
                    {
                        "title": "Dosya",
                        "render": function (data, type, row) {
                            var onclick = "";
                            for (let i = 0; i < row.AskiDosyasViewModel.length; i++) {
                                onclick += `window.open('${row.AskiDosyasViewModel[i].Ad}');`;
                            }
                            const inner = `<a href="#" class="on-default edit-row" style="margin-left:50px;" onclick="${onclick
                                }" title="Ön izleme"><i class="fa fa-eye-slash"></i></a>`;
                            return inner;
                        }
                    },
                    {
                        "title": "Eylemler",
                        "render": function (data, type, row) {
                            const inner = `<a href="/Aski/Edit?id=${row.Id}" class="on-default edit-row" title="Güncelle" data-id="${row.Id
                                }"><i class="fa fa-pencil"></i></a>  <a href="javascript:void(0);" class="delete-btn" title="Sil" data-id="${row.Id
                                }"><i class="fa fa-trash-o"></i></a>`;
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
                        'targets': [1, 2, 3],
                        'createdCell': function (td, cellData, rowData, row, col) {
                            $(td).attr('title', cellData);
                            if (col === 2) {
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
    };
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

$.fn.dataTable.ext.search.push(function (settings, data) {
    const selectedIlce = $(".js-example-basic-multiple option:selected").text();
    const ilceData = data[3];
    if ((selectedIlce.indexOf(ilceData) !== -1) || (selectedIlce === "")) {
        return true;
    }
    return false;
});

$('#ilceId,#startDate,#endDate').on('change', function () {
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
                window.location.href = `/Aski/Delete?id=${userid}`;
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