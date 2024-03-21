// write cool JS hwere!!

getLocation()




function getLocation() {

    if (navigator.geolocation) {

        //  navigator.geolocation.getCurrentPosition requires a succes function name as first param and a error function name as second param.

        navigator.geolocation.getCurrentPosition(showPosition, geoError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {


    console.log(position.coords.longitude);
    console.log(position.coords.latitude);

}

function geoError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");

            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.");

            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");

            break;
    }
}



//   fetch(`https://geocode.maps.co/reverse?lat=${lat}&lon=${long}&api_key=65fb5ea644244903025253axe09afbb`)

