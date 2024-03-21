// write cool JS hwere!!

getLocation()




function getLocation() {

    if (navigator.geolocation) {

        //  navigator.geolocation.getCurrentPosition requires a succes function name as first param and a error function name as second param.

        navigator.geolocation.getCurrentPosition(PositionRecieved, geoError);
    } else {
        //x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

// Geo location succes function recieves a data object 
function PositionRecieved(position) {
    //console.log(position);
    console.log(position.coords.longitude);
    console.log(position.coords.latitude);

    GetHumanReadableLocation(position.coords.latitude, position.coords.longitude)
}


//geo error function recievs a data object
function geoError(error) {

    console.log(error.message);
}





function GetHumanReadableLocation(lat, long) {

    const apiKey = "65fb5ea644244903025253axe09afbb";
    const url = `https://geocode.maps.co/reverse?lat=${lat}&lon=${long}&api_key=${apiKey}`;

    fetch(url)

        .then(response => {



            if (!response.ok) {
                throw new Error('Network response was not ok');
            }


            return response.json();
        })
        .then(data => {


            BuildlocationName(data.address.city)

        })
        .catch(error => {
            console.error('Error fetching data:', error);
            return null;
        });
}



// temp viewCode
function BuildlocationName(myCity) {

    console.log(myCity);

    let myNameElement = document.getElementById("app")

    myNameElement.innerText = myCity

}



