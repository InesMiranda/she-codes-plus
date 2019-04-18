//Creation of variables
let place = document.querySelector("#city");
let country = document.querySelector("#country");
let time = document.querySelector("#date-time");
let description = document.querySelector("#weather-description");
let temperature = document.querySelector("#weather-temperature");
let temperatureHigher = document.querySelector("#weather-higher-temperature");
let temperatureLower = document.querySelector("#weather-lower-temperature");
let windSpeed = document.querySelector("#weather-wind-speed");
let humidity = document.querySelector("#weather-humidity");
let visibility = document.querySelector("#weather-visibility");
let uvIndex = document.querySelector("#weather-uv-index");
let form = document.querySelector("#weather-form");
let currentLocation = document.querySelector("#current-location");


let apiKey = "ea123f7f053ae1c00499328f0f8b0c1c";
let apiRoot = "https://api.openweathermap.org/data/2.5"
let apiUrl = `${apiRoot}/weather?q=${city}&appid=${apiKey}&units=metric`;

//Function to make date work
function formatDate(date){
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    let day = days[date.getDay()];
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${day} ${hours}:${minutes}`;
}

//Function to refresh data with the response provided by the API
function refreshWeather(response){
    place.innerHTML = response.data.name;
    country.innerHTML = response.data.sys.country;
    time.innerHTML = formatDate(new Date(response.data.dt * 1000));
    description.innerHTML = response.data.weather[0].main;
    temperature.innerHTML = Math.round(response.data.main.temp);
    humidity.innerHTML = response.data.main.humidity;
    windSpeed.innerHTML = Math.round(response.data.wind.speed);
    temperatureHigher.innerHTML = Math.round(response.data.main.temp_max);
    temperatureLower.innerHTML = Math.round(response.data.main.temp_min);
    visibility.innerHTML = response.data.visibility;
}

//Function to make search get the API response of what we put on search
function search(city){
    let apiUrl = `${apiRoot}/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(refreshWeather);
}

//Function to male sure that we get an alert if no city is inserted on search
function handleSearch(event){
    event.preventDefault();
    let input = document.querySelector("#weather-search");

    if (input.value.length > 0){
        search(input.value);
    } else {
        alert ("Please enter a city");
    }
}

//Function that updates the weather data after getting the results of our current location
function searchPosition(position){
    let apiUrl = `${apiRoot}/weather?lan=${position.coords.longitude}&lat=${position.coords.latitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(refreshWeather);
}

//Function that gets our current location after pressing the button
function getLocationWeather(event){
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchPosition);

}

form.addEventListener("submit",handleSearch);
currentLocation.addEventListener("click", getLocationWeather);

search("Lisbon");


