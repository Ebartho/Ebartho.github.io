let sunrise_text = document.getElementById("sunrise_time")
let sunset_text = document.getElementById("sunset_time")
let lat_input = document.getElementById("lat_input");
let long_input = document.getElementById("long_input");
let button = document.getElementById("button");
let sida = document.getElementById("wrapper");
let latitud;
let longitud;
let ingenJS = document.getElementById("ingenJS")
let h1 = document.getElementById("h1rubrik")

sida.style.visibility = "visible";
ingenJS.style.visibility = "hidden";

//Dessa rader skapar kartan med hjälp av en API
let map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Map data from <a href="http://www.openstreetmap.org">OpenStreetMap</a>'
}).addTo(map);  
var popup = L.popup();

/*
Funktionerna hanterar när användaren klickar på kartan. När kartan klickas på så körs funktionen onMapClick, där lagras latitud och longitud värdena 
på den position som användaren i en konstant. Sedan visas en "popup" där hen klickade som visar vilka koordinater som hen klickade på. 
Därefter så skickas latitud och longitud värdena in i 2 andra variabler som används senare. 
Tillslut så körs funktionen getData som använder de 2 variablerna för att skriva ut tid punkten för soluppgång och solnedgång.
*/
map.on('click', onMapClick);
function onMapClick(e) {
  const { lat, lng } = e.latlng;
    popup
        .setLatLng(e.latlng)
        .setContent("Latitud: " + lat + " <br> Longitud: " + lng)
        .openOn(map);
        latitud = lat;
        longitud = lng;
        lat_input.value = lat;
        long_input.value = lng;
        getData();
}


/*
När knappen klickas på så lagras de värdena som användaren har matat in i en input field i variabler
som sedan används för att skriva ut tidpunkterna i getData funktionen
*/
button.addEventListener("click", inputData);
function inputData(){
  latitud = parseFloat(lat_input.value);
  longitud = parseFloat(long_input.value);
  getData();
}

/*
Denna funktion använder sig av en API för att hämta tidpunkter för soluppgång och solnedgång beroende på de koordinater som har matats in
i tidigare funktioner. Efter API har gett sidan tidpunkterna skrivs dessa tidpunkter ut i en h2 tagg för användaren att se
*/
async function getData() {
  console.log("test");
  const url = "https://api.sunrise-sunset.org/json?lat=" + latitud + "&lng=" + longitud + "&date=today&tzid=Europe/Stockholm";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    const sunrise = result.results.sunrise;
    const sunset = result.results.sunset;
    console.log(result);

    sunrise_text.innerHTML =sunrise;
    sunset_text.innerHTML = sunset;
  } catch (error) {
    console.error(error.message);
  }
}


