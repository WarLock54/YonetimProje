var assetListVM;
$(function () {
    assetListVM = {
        dt: null,
        init: function () {
            $('.js-example-basic-multiple3').select2({
                placeholder: "Durum ...",
                allowClear: true
            });
            $('.js-example-basic-multiple').select2({
                placeholder: "İlçe ...",
                allowClear: true
            });
            $('.js-example-basic-multiple2').select2({
                placeholder: "Kooperatif ...",
                allowClear: true
            });
            window.dt = $('#datatable').DataTable({
                "proccessing": true,
                "serverSide": true,
                "ajax": {
                    "url": '/Kupe/Get',
                    "data": function (data) {
                        if (startDate != null || endDate != null) {
                            data.startDate = $('#startDate').val();
                            data.endDate = $('#endDate').val();
                        }
                        if (window.koopId != null) {
                            data.koopIds = $('#koopId').val().toString();
                        }
                        if (window.ilceId != null) {
                            data.ilceIds = $('#ilceId').val().toString();
                        }
                        if (window.statusId != null) {
                            data.statusIds = $('#statusId').val().toString();
                        }
                    }
                },
                "columns": [
                    { "title": "Sıra", "data": "Id" },
                    { "title": "Tarih", "data": "Tarih", "searchable": true, "stitle:": "Tarih" },
                    { "title": "Hayvan Sahibi", "data": "MobilID", "searchable": true },
                    { "title": "Telefon", "data": "Telefon", "searchable": true },
                    { "title": "Kooperatif", "data": "KoopID", "searchable": true },
                    { "title": "İlçe", "data": "IlceID", "searchable": true },
                    { "title": "Irk", "data": "IrkID", "searchable": true },
                    { "title": "İşletme No", "data": "IsletmeNo", "searchable": true },
                    { "title": "Anne Küpe No", "data": "DogNo", "searchable": true },
                    { "title": "Doğum Tarih: ", "data": "DogTarih", "searchable": true },
                    { "title": "Cinsiyet", "data": "CinsiyetID", "searchable": true },
                    { "title": "Durum", "data": "DurumID", "searchable": true },
                    {
                        "title": "Eylemler",
                        "render": function (data, type, row) {
                            const inner = `<a href="javascript:void(0);" class="chng-status" title="Durum" data-id="${row.Id
                                }"><i class="fa fa-circle-o-notch" style="color:crimson;"></i></a> <a href="/Kupe/Güncelle?id=${row.Id
                                }" class="on-default edit-row" title="Güncelle" data-id="${row.Id
                                }"><i class="fa fa-pencil"></i></a>  <a href="javascript:void(0);" class="delete-btn" title="Sil" data-id="${
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
                        'targets': [1, 2, 3, 4, 5, 6, 7],
                        'createdCell': function (td, cellData, rowData, row, col) {
                            $(td).attr('title', cellData);
                            if (col === 2) {
                                $(td).attr('id', `title-${rowData.Id}`);
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
                        columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                    }
                }],
                "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                    if (aData.DurumID === "Red") {
                        $('td', nRow).css('background-color', 'beige');
                    }
                    else if (aData.DurumID === "Onay") {
                        $('td', nRow).css('background-color', 'darkseagreen');
                    }
                    else if (aData.DurumID === "Takıldı") {
                        $('td', nRow).css('background-color', 'darksalmon');
                    }
                    else if (aData.DurumID === "Kayıt Edildi") {
                        $('td', nRow).css('background-color', 'darkturquoise');
                    }
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
    const selectedIlce = $(".js-example-basic-multiple option:selected").text();
    const ilceData = data[5];

    const selectedStatus = $(".js-example-basic-multiple3 option:selected").text();
    const statusData = data[10];

    const selectedkoop = $(".js-example-basic-multiple2 option:selected").text();
    const koopData = data[4];

    if (((selectedIlce.indexOf(ilceData) !== -1) || (selectedIlce === "")) &&
        ((selectedStatus.indexOf(statusData) !== -1) || (selectedStatus === "")) &&
        ((selectedkoop.indexOf(koopData) !== -1) || (selectedkoop === ""))) {
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

$('#statusId,#ilceId,#koopId,#startDate,#endDate').on('change', function () {
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
            window.location.href = `/Kupe/Delete?id=${userid}`;
        } else {
            window.swal("İptal", "Veri güvende", "info");
        }
    });
});

$('#datatable').on('click', '.chng-status', function () {
    const chngStatusBtn = $(this);
    $('#chngeStatusKupeId').val(chngStatusBtn.attr('data-id'));
    $.ajax({
        url: `/Kupe/StatusDropDown/${chngStatusBtn.attr('data-id')}`,
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

$('#datatable').on('click', '.chng-bakstatus', function () {
    const chngStatusBtn = $(this);
    $('#chngeBakStatusKupeId').val(chngStatusBtn.attr('data-id'));
    $.ajax({
        url: `/Kupe/StatusDropDowns/${chngStatusBtn.attr('data-id')}`,
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
            $('#chngeBakStatusModalBody').html(dropdownString);
            $('#chngeBakStatusModal').modal();
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