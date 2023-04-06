$(function () {
    $("#videoSearch").keyup(function () {
        const name = $(this).val();
        $(".page-item").removeClass("active");
        $(".pageNo-1").addClass("active");
        $.ajax({
            url: "/Galeri/GenelLoadVideosBy",
            data: { name: name },
            async: false,
            success: function (partialview) {
                $("#videoPartialDiv").html(partialview);
            }
        });
    });
});

function GenelLoadVideosBy() {

}