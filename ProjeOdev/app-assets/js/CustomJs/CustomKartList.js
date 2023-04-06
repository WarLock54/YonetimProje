var table;
$(document).ready(function () {
    $('.js-example-basic-multiple3').select2({
        placeholder: "Durum ...",
        allowClear: true
    });
    table = $('#datatable').DataTable({
        dom: 'Bfrtip',
        buttons: [{
            extend: 'excel',
            text: "Çıktı Excel <i class='ft-file - minus'></i>",
            exportOptions: {
                columns: [0, 1, 2, 3, 4, 5, 6, 7, 8]
            }
        }],
        "fnRowCallback": function (nRow, aData, iDisplayIndex) {
            const oSettings = this.fnSettings();
            $("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
            return nRow;
        },
        responsive: true
    });
});

$('#datatable').on('click', '.delete-btn', function () {
    const deleteBtn = $(this);
    var userid = deleteBtn.data('id');
    const title = deleteBtn.closest("tr").find(".title").text();
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
            window.location.href = `/Kart/Delete?id=${userid}`;
        } else {
            window.swal("İptal", "Veri güvende", "info");
        }
    });
});

$('.ft-upload').on('click', function (e) {
    e.preventDefault();
    $('#importExcelModal').modal();
});

$.fn.dataTable.ext.search.push(function (settings, data) {
    const selectedStatus = $(".js-example-basic-multiple3 option:selected").text();
    const statusData = data[9];

    if (((selectedStatus.indexOf(statusData) !== -1) || (selectedStatus === ""))) {
        return true;
    }
    return false;
});

$('#statusId').on('change', function () {
    table.draw();
});

$('#datatable').on('click', '.chng-status', function () {
    const chngStatusBtn = $(this);
    $('#chngeStatusKartId').val(chngStatusBtn.attr('data-id'));
    $.ajax({
        url: `/Kart/StatusDropDown/${chngStatusBtn.attr('data-id')}`,
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