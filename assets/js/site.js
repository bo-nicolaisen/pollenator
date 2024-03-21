// write cool JS hwere!!

getLocation()




function getLocation() {

    if (navigator.geolocation) {

        //  navigator.geolocation.getCurrentPosition requires a succes function name as first param and a error function name as second param.

        navigator.geolocation.getCurrentPosition(PositionRecieved, geoError);

    } else {
        alert("Geolocation is not supported by this browser.")
    }
}

// Geo location succes function recieves a data object 
function PositionRecieved(position) {
    //console.log(position);
    console.log(position.coords.longitude);
    console.log(position.coords.latitude);

    // get location name
    GetHumanReadableLocation(position.coords.latitude, position.coords.longitude)

    // get pollen data on location
    GetPollenData(position.coords.latitude, position.coords.longitude)
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



function GetPollenData(lat, long) {



    /*  https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${long}&current=alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen&hourly=alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen&timezone=${timeZone}&forecast_days=1
  */
    const timeZone = "Europe%2FBerlin";

    const url = ` https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${long}&current=alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen&hourly=alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen&timezone=${timeZone}&forecast_days=1`;


    console.log("get pollen data");
    console.log(lat, long);

    fetch(url)

        .then(response => {



            if (!response.ok) {
                throw new Error('Network response was not ok');
            }


            return response.json();
        })
        .then(data => {


            pollenDataScructure(data)

        })
        .catch(error => {
            console.error('Error fetching data:', error);
            return null;
        });
}


// controller
function pollenDataScructure(data) {

    let myViewData = []

    // data about current values
    myViewData.push(data.current)



    BuildPollenView(myViewData)


}


// view code

function BuildPollenView(viewData) {

    // build current
    let myDisplayElement = document.getElementById('PollenData')

    //console.log(viewData[0]);

    let myCurrentData = viewData[0]
    // generate Card HTML for current values
    let myCurrentHTML = `<section id="currentValues"><h2>Pollental</h2><ul>
                <li>El ${myCurrentData.alder_pollen}</li>
                <li>Birk ${myCurrentData.birch_pollen}</li>
                <li>Græs ${myCurrentData.grass_pollen}</li>
                <li>Bynke ${myCurrentData.mugwort_pollen}</li>
                 <li>Oliven ${myCurrentData.olive_pollen}</li>
                   <li>Ambrosia ${myCurrentData.ragweed_pollen}</li>
            </ul>
        </section>`

    myDisplayElement.innerHTML = myCurrentHTML
}











// temp viewCode
function BuildlocationName(myCity) {

    console.log(myCity);

    let myNameElement = document.getElementById("location")

    myNameElement.innerText = myCity

}



