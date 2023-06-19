
var Enlem, Boylam,Lokasyon;

setInterval(function () {
    debugger;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (pos) {
            Enlem = pos.coords.latitude;
            Boylam = pos.coords.longitude;
            Lokasyon = "https://www.google.com/maps/embed/v1/place?key=AIzaSyB6TXrZRoJzKTVxmwER_uudOdAyHIbuHCM&q=" + Enlem + "," + Boylam + "";
        })
    }
}, 2000);
$.ajax({
    url: '@UrlAction("Ekleme","LokBelirle")',
    type: "post",
    data: { Lokasyon: Lokasyon, Enlem: Enlem, Boylam: Boylam },
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
        console.log("Veri gönderilmesinde hata oldu.")
    }
})


             
/*  var lok = document.getElementById("Lok");

var enlem, boylam;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(Goster)
    }
    else {
        lok.innerHTML = "Hata";
    }
}
function Goster(pos) {
    //  buton.innerHTML = "Enlem" + pos.coords.latitude + "<br/>Boylam" + pos.coords.longitude;
    enlem = pos.coords.latitude;
    boylam = pos.coords.longitude;
    document.getElementById("enlem").setAttribute("value", enlem)
    document.getElementById("boylam").setAttribute("value", boylam)
    document.getElementById("Lok").setAttribute("value", "https://www.google.com/maps/embed/v1/place?key=AIzaSyB6TXrZRoJzKTVxmwER_uudOdAyHIbuHCM&q=" + enlem + "," + boylam +"");
    document.getElementById("map").setAttribute("src", "https://www.google.com/maps/embed/v1/place?key=AIzaSyB6TXrZRoJzKTVxmwER_uudOdAyHIbuHCM&q=" + enlem + "," + boylam +"")
}


function initMap() {
    const myLatLng = { lat: enlem, lng: boylam };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 50,
        center: myLatLng,
    });
    new google.maps.Marker({
        position: myLatLng,
        map,
        title: "Konum Bul",
    });
}
window.initMap = initMap;



var button = document.getElementById("tekrarla");

function submitForm() {
    document.getElementById("myForm").addEventListener("submit", function () {
        debugger;
        setInterval(function () {
        button.click(function () {
                lok.click();
        })
        }, 1000);
    })
}*/
/**/
/*
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
var map; 

function initMap() {

    navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
            lat: enlem,
            lng: boylam
        };

        map = new google.maps.Map(document.getElementById('map'), {
           
            zoom: 15
        });

        var marker = new google.maps.Marker({
            position: pos,
            map: map,
            title: 'Current Location'
        });


        setTimeout(function () {
            debugger;
            document.querySelector("tekrarla").addEventListener("click", function () {
            setInterval(function () {
                debugger;
                navigator.geolocation.getCurrentPosition(function (position) {

                    var newPos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    marker.setPosition(newPos);
                    map.setCenter(newPos);
                        $.ajax({
                            url: "LokBelirle/KonumEkle",
                            type: "post",
                        })
                    })
                },2000);
            });
        },3000);
    });

}
*/
/*
const numClicks = 10;
const clickDelay = 1000;

function autoclicker() {
    let clicks = 0;
    const interval = setInterval(() => {
        document.getElementById('tekrarla').click();
        clicks++;
        if (clicks === numClicks) {
            clearInterval(interval);
        }
    }, clickDelay);
}
autoclicker();
*/