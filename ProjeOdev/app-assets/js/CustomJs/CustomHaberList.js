var assetListVM;
$(function () {
    assetListVM = {
        dt: null,
        init: function () {
            $('.js-example-basic-multiple').select2({
                placeholder: "Tür ...",
                allowClear: true
            });
            window.dt = $('#datatable').DataTable({
                "proccessing": true,
                "serverSide": true,
                "ajax": {
                    "url": '/Haber/Get',
                    "data": function (data) {
                        if (startDate !== null || endDate !== null) {
                            data.startDate = $('#startDate').val();
                            data.endDate = $('#endDate').val();
                        }
                        if (window.TurId !== null) {
                            data.TurIds = $('#TurId').val().toString();
                        }
                    }
                },
                "columns": [
                    { "title": "Sıra", "data": "id" },
                    { "title": "Tarih", "data": "tarih", "searchable": true, "stitle:": "tarih" },
                    { "title": "Tür", "data": "Tur", "searchable": true },
                    { "title": "Başlık", "data": "baslikTR", "searchable": true },
                    {
                        "title": "Yayın", "data": "Yayin", "searchable": true,
                        "mRender": function (data) {
                            return data === "True" || data === "true" ? "Evet" : "Hayır";
                        }
                    },
                    {
                        "title": "Eylemler",
                        "render": function (data, type, row) {
                            const inner = `<a href="/Haber/Goster?id=${row.id
                                }" target="_blank" class="on-default edit-row" title="Ön izleme"><i class="fa fa-eye-slash"></i></a>  <a href="/Haber/Edit?id=${
                                row.id}" class="on-default edit-row" title="Güncelle" data-id="${row.id
                                }"><i class="fa fa-pencil"></i></a>  <a href="javascript:void(0);" class="delete-btn" title="Sil" data-id="${row.id
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
                        'targets': [1, 2, 3, 4],
                        'createdCell': function (td, cellData, rowData, row, col) {
                            $(td).attr('title', cellData);
                            if (col === 3) {
                                $(td).attr('id', `title-${rowData.id}`);
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

$.fn.dataTable.ext.search.push(function (settings, data) {
    const selectedTur = $(".js-example-basic-multiple option:selected").text();
    const turData = data[2];

    if (((selectedTur.indexOf(turData) !== -1) || (selectedTur === ""))) {
        return true;
    }
    return false;
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

$('#TurId,#SubeID,#startDate,#endDate').on('change', function () {
    dt.draw();
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
                window.location.href = `/Haber/Delete?id=${userid}`;
            } else {
                window.swal("İptal", "Veri güvende", "info");
            }
        });
});