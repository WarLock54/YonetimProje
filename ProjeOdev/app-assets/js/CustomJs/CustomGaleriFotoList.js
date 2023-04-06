$(function () {
    $("#imageSearch").keyup(function () {
        const name = $(this).val();
        $(".page-item").removeClass("active");
        $(".pageNo-1").addClass("active");
        $.ajax({
            url: "/Galeri/GenelLoadImagesBy",
            data: { name: name },
            async: false,
            success: function (partialview) {
                $("#imagePartialDiv").html(partialview);
            }
        });
    });
});

function GenelLoadImagesBy() {

}

function openImageSlider(baslik, event) {
    event.preventDefault();
    const pswpElement = document.querySelectorAll('.pswp')[0];
    var items;
    $.ajax({
        type: "POST",
        url: "/Galeri/GetImagesByGenelId",
        data: { Id: baslik },
        async: false,
        success: function (GenelImagesList) {
            items = GenelImagesList;
        }
    });

    const options = {
        index: 0
    };

    const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
}