



setInterval(function () {
    navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const mapLink = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    }

// AJAX isteği yap.
$.ajax({
    url: '@Url.Action("KonumAL", "Home")',
    type: 'POST',
    data: { latitude: latitude, longitude: longitude, mapLink: mapLink, KulID: KulID },
    success: function () {
        const veri = ("Anlık konum bilginiz veri merkezine gönderilmiştir ...");
        window.toastr["success"](veri,
            {
                closeButton: true,
                autoClose: true,
                timeOut: 5000,
                fadeOut: 1000,
                tapToDismiss: false
            });
    },
    error: function () {
        // İstek başarısız olursa burada ne yapılacağını yazın.
    }
});