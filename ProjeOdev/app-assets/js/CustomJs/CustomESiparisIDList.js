var assetListVM;
$(function () {
    assetListVM = {
        dt: null,
        init: function () {
            $('.js-example-basic-multiple').select2({
                placeholder: "Sipariş No ...",
                allowClear: true
            });
            window.dt = $('#datatable').DataTable({
                "proccessing": true,
                "serverSide": true,
                "select": {
                    style: 'multi'
                },
                "ajax": {
                    "url": '/ETicaret/ESiparisIDGet',
                    "data": function (data) {
                        var hiddenSiparid = $('#siparid').val().toString();
                        data.hiddenSiparid = hiddenSiparid;
                        if (window.esiparisdetayId != null) {
                            data.esiparisdetayIds = $('#esiparisdetayId').val().toString();
                        }
                    }
            },
                "columns": [
                { "title": "Sıra", "data": "Id" },
                { "title": "Sipariş No", "data": "SiparisID", "searchable": true },
                { "title": "Ürün Adı", "data": "UrunID", "searchable": true },
                { "title": "Adet", "data": "Adet", "searchable": true },
                {
                    "title": "Eylemler",
                    "render": function (data, type, row) {
                        var hiddenSiparid = $('#siparid').val().toString();
                        const inner = `

                            <a href="/ETicaret/ESiparisDetayGüncelle?id=${row.Id
                            }&siparid=${hiddenSiparid}" class="on-default edit-row" title="Güncelle" data-id="${row.Id
                            }"><i class="fa fa-pencil"></i></a>

                                <a href="javascript:void(0);" class="delete-btn" title="Sil" data-id="${row.Id
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
                        if (col === 1) {
                            $(td).attr('id', `${rowData.Id}`);
                        }
                    }
                }
            ],
                lengthMenu: [[10, 50, 100, 15000, -1], [10, 50, 100, 15000]],
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
                        columns: [0, 1, 2, 3]
                    }
                }],
                responsive: true

            });
        }
    }
assetListVM.init();
});

$.fn.dataTable.ext.search.push(function (settings, data) {
    const selectedSiparisDetay = $(".js-example-basic-multiple option:selected").text();
    const siparisdetayData = data[5];

    if (((selectedSiparisDetay.indexOf(siparisdetayData) !== -1) || (selectedSiparisDetay === ""))) {
        return true;
    }
    return false;
});

$('#datatable').on('click', '.delete-btn', function () {
    const deleteBtn = $(this);
    var userid = deleteBtn.data('id');
    var hiddenSiparid = $('#siparid').val().toString();
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
                window.location.href = `/ETicaret/ESiparisDetayDelete?id=${userid}&siparid=${hiddenSiparid}`;
            } else {
                window.swal("İptal", "Veri güvende", "info");
            }
        });
});

$('#datatable').on('click', '.chng-status', function () {
    const chngStatusBtn = $(this);
    $('#chngeStatusETicaretId').val(chngStatusBtn.attr('data-id'));
    $.ajax({
        url: `/ETicaret/DetayStatusDropDown/${chngStatusBtn.attr('data-id')}`,
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
        url: `/ETicaret/DetayStatusDropDown/${selectedIds}`,
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