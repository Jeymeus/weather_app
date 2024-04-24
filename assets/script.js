const apiKey = "55865da6c618429f893115221242304";
const baseUrl = "https://api.weatherapi.com/v1/current.json?key=" + apiKey;


// Load configuration from config.json
fetch("config.json")
  .then((response) => response.json())
  .then((config) => {
    defaultCity = config.defaultCity; // Assigning the value of defaultCity outside of the callback function
    getWeatherData(defaultCity); // Calling the getWeatherData function with the default city
    setInterval(function () {
      getWeatherData(defaultCity); // Updating weather data every hour for the default city
    }, 3600000);
  })

  .catch((error) => {
    console.error("Erreur lors du chargement de la configuration :", error);
  });

function getWeatherData(defaultCity) {
  let url = baseUrl + "&q=" + defaultCity + "&aqi=no";
  console.log(defaultCity);

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
     
      const cityName = data.location.name;
      const country = data.location.country;
      const region = data.location.region;
      const condition = data.current.condition.text;
      const icon = data.current.condition.icon;
      const temperature = data.current.temp_c;
      const windSpeed = data.current.wind_kph;
      const iconImage = document.getElementById("icon");
      iconImage.src = "https:" + icon;

      // Update HTML elements with retrieved data
      document.getElementById("cityName").textContent = "Ville : " + cityName;
      document.getElementById("icon").src = "https:" + icon;
      document.getElementById("country").textContent = "Pays : " + country;
      document.getElementById("region").textContent = "Région : " + region;
      document.getElementById("condition").textContent =
        "Condition : " + condition;
      document.getElementById("temperature").textContent =
        "Température : " + temperature + "°C";
      document.getElementById("windSpeed").textContent =
        "Vent : " + windSpeed + " km/h";

      // Display weather data
      document.getElementById("weatherDataContainer").style.display = "block";

      // Update time until next refresh
      updateRefreshTimer();
    })

    .catch((error) => {
      console.error(
        "Erreur lors de la récupération des données météorologiques :",
        error
      );
    });
}

// Function to update time every second
function updateRefreshTimer() {
  let timerDiv = document.getElementById("refreshTimer");
  let countdown = 3600; // Time in seconds until next refresh

  
  let timerInterval = setInterval(function () {
    if (countdown <= 0) {
      clearInterval(timerInterval); // Stop timer when time is up
    } else {
      let hours = Math.floor(countdown / 3600);
      let minutes = Math.floor((countdown % 3600) / 60);
      let seconds = countdown % 60;
      timerDiv.textContent = `Prochaine mise à jour : ${hours}h ${minutes}m ${seconds}s`;
      countdown--;
    }
  }, 1000); 
}
