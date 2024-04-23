const apiKey = "55865da6c618429f893115221242304" ;
const baseUrl = "https://api.weatherapi.com/v1/current.json?key=" + apiKey ;

document.getElementById("weather").addEventListener("click", function (e) {
    e.preventDefault();

    let city = document.getElementById("city").value;
    let url = baseUrl + "&q=" + city + "&aqi=no";

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const city = data.location.name;
        const country = data.location.country;
        const region = data.location.region;
        const condition = data.current.condition.text;
        const icon = data.current.condition.icon;
        const temperature = data.current.temp_c;
        const windSpeed = data.current.wind_kph;

        // Affichage des données dans le DOM
        document.getElementById("cityWeather").textContent = "Ville : " + city;
        document.getElementById("country").textContent = "Pays : " + country;
        document.getElementById("region").textContent = "Région : " + region;
        document.getElementById("condition").textContent = "Conditions : " + condition;
        document.getElementById("icon").src = "https:" + icon;
        document.getElementById("temperature").textContent = "Température : " + temperature + "°C";
        document.getElementById("windSpeed").textContent = "Vitesse du vent : " + windSpeed + " km/h";
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des données météorologiques :",
          error
        );
      });
});

