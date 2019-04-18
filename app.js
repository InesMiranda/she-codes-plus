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


let apiKey = "ea123f7f053ae1c00499328f0f8b0c1c";
let apiRoot = "https://api.openweathermap.org/data/2.5"
let apiUrl = `${apiRoot}/weather?q=${city}&appid=${apiKey}&units=metric`;

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

function handleSearch(event){
    event.preventDefault();
    let input = document.querySelector("#weather-search");
    let apiUrl = `${apiRoot}/weather?q=${input.value}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(refreshWeather);
}

form.addEventListener("submit",handleSearch);



