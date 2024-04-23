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
        console.log("success", data);
        })
        .catch((error) => {
        console.error("fail", error);
        });
});

