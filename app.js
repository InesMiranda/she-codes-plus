let city = document.querySelector("#city");
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

let apiKey = "ea123f7f053ae1c00499328f0f8b0c1c";
let apiRoot = "https://api.openweathermap.org/data/2.5"
let apiUrl = `${apiRoot}/weather?q=Lisbon&appid=${apiKey}&units=metric`;


function refreshWeather(response){
    city.innerHTML = response.data.name;
    country.innerHTML = response.data.sys.country;
    time.innerHTML = response.data.dt;
    description.innerHTML = response.data.weather[0].main;
    temperature.innerHTML = response.data.main.temp;
    humidity.innerHTML = response.data.main.humidity;
    windSpeed.innerHTML = response.data.wind.speed;
    temperatureHigher.innerHTML = response.data.main.temp_max;
    temperatureLower.innerHTML = response.data.main.temp_min;
    visibility.innerHTML = response.data.visibility;
}

axios.get(apiUrl).then(refreshWeather);

