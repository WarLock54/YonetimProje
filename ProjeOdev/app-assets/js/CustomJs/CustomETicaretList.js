var assetListVM;
$(function () {
    assetListVM = {
        dt: null,
        init: function () {
            $('.js-example-basic-multiple').select2({
                placeholder: "Durum ...",
                allowClear: true
            });
            window.dt = $('#datatable').DataTable({
                "proccessing": true,
                "serverSide": true,
                "select": {
                    style: 'multi'
                },
                "ajax": {
                    "url": '/ETicaret/ESipariGet',
                    "data": function (data) {
                        if (startDate != null || endDate != null) {
                            data.startDate = $('#startDate').val();
                            data.endDate = $('#endDate').val();
                        }
                        if (window.edurumId != null) {
                            data.edurumIds = $('#edurumId').val().toString();
                        }
                    }
                },
                "columns": [
                    { "title": "Sıra", "data": "Id" },
                    { "title": "Tarih", "data": "Tarih", "searchable": true, "stitle:": "Tarih" },
                    { "title": "Kullanıcı", "data": "MobilID", "searchable": true },
                    { "title": "Sipariş Numarası", "data": "SiparisNo", "searchable": true },
                    { "title": "Takip No", "data": "KargoTakipNo", "searchable": true },
                    { "title": "Durum", "data": "DurumID", "searchable": true },
                    {
                        "title": "Eylemler",
                        "render": function (data, type, row) {
                            const inner = `<a href="javascript:void(0);" class="chng-status" title="Durum" data-id="${row.Id
                                }"><i class="fa fa-circle-o-notch" style="color:crimson;"></i></a>

                                <a href="/ETicaret/ESipariGüncelle?id=${row.Id
                                }" class="on-default edit-row" title="Güncelle" data-id="${row.Id
                                }"><i class="fa fa-pencil"></i></a>

                                <a href="javascript:void(0);" class="delete-btn" title="Sil" data-id="${
                                row.Id
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
                        'targets': [1, 2, 3, 4, 5],
                        'createdCell': function (td, cellData, rowData, row, col) {
                            $(td).attr('title', cellData);
                            if (col === 1) {
                                $(td).attr('id', `${rowData.Id}`);
                            }
                        }
                    }
                ],
                lengthMenu: [[10, 50, 100, 15000, -1], [10, 50, 100, 15000]],
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

$.fn.dataTable.ext.search.push(function (settings, data) {
    const selectedDurum = $(".js-example-basic-multiple option:selected").text();
    const durumData = data[5];

    if (((selectedDurum.indexOf(durumData) !== -1) || (selectedDurum === ""))) {
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

$('#edurumId,#startDate,#endDate').on('change', function () {
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
            window.location.href = `/ETicaret/ESipariDelete?id=${userid}`;
        } else {
            window.swal("İptal", "Veri güvende", "info");
        }
    });
});

$('#datatable').on('click', '.chng-status', function () {
    const chngStatusBtn = $(this);
    $('#chngeStatusETicaretId').val(chngStatusBtn.attr('data-id'));
    $.ajax({
        url: `/ETicaret/StatusDropDown/${chngStatusBtn.attr('data-id')}`,
        type: 'get',
        success: function (data) {
            var dropdownString = '<select name="statusId" class="form-control">';
            for (let i = 0; i < data.length; i++) {
                if (data[i].Selected) {
                    dropdownString += `<option value="${data[i].Value}" selected>${data[i].Text}</option>`;
                } else {
                    dropdownString += `<option value="${data[i].Value}">${data[i].Text}</option>`;
                }
            }
            dropdownString += '</select>';
            $('#chngeStatusModalBody').html(dropdownString);
            $('#chngeStatusModal').modal();
        }
    });
});

var selectedIds = [];
function getselect() {
    selectedIds = [];
    $('#datatable tr.selected').each(function (index, elem) {
        const deger = dt.row(elem).data();
        const id = deger.Id;
        selectedIds.push(id);
    });
}
$('#datatable').on('click', 'tr', function () {
    setTimeout(getselect, 300);
});

$('.chng-status').on('click', function (e) {
    $('#chngeStatusETicaretId').val(selectedIds);
    $.ajax({
        url: `/ETicaret/StatusDropDown/${selectedIds}`,
        type: 'get',
        success: function (data) {
            var dropdownString = '<select name="statusId" class="form-control">';
            for (let i = 0; i < data.length; i++) {
                if (data[i].Selected) {
                    dropdownString += `<option value="${data[i].Value}" selected>${data[i].Text}</option>`;
                } else {
                    dropdownString += `<option value="${data[i].Value}">${data[i].Text}</option>`;
                }
            }
            dropdownString += '</select>';
            $('#chngeStatusModalBody').html(dropdownString);
            $('#chngeStatusModal').modal();
        }
    });
});