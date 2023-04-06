var table;
$(document).ready(function () {
    table = $('#datatable').DataTable({
        "fnRowCallback": function (nRow, aData, iDisplayIndex) {
            const oSettings = this.fnSettings();
            $("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
            return nRow;
        },
        responsive: true
    });
});