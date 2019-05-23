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
let dayPlusOne = document.querySelector("#date-time-1");
let dayPlusTwo = document.querySelector("#date-time-2");
let dayPlusThree = document.querySelector("#date-time-3");
let dayPlusFour = document.querySelector("#date-time-4");
let tempForecastOne= document.querySelector("#temp-forecast-1");
let tempForecastTwo= document.querySelector("#temp-forecast-2");
let tempForecastThree= document.querySelector("#temp-forecast-3");
let tempForecastFour= document.querySelector("#temp-forecast-4");
let tempForecastDescriptionOne = document.querySelector("#temp-forecast-description-1");
let tempForecastDescriptionTwo = document.querySelector("#temp-forecast-description-2");
let tempForecastDescriptionThree = document.querySelector("#temp-forecast-description-3");
let tempForecastDescriptionFour = document.querySelector("#temp-forecast-description-4");

let apiKey = "ea123f7f053ae1c00499328f0f8b0c1c";
let apiRoot = "https://api.openweathermap.org/data/2.5"
let apiUrl = `${apiRoot}/weather?q=${city}&appid=${apiKey}&units=metric`;

let apiForecastUrl = `${apiRoot}/forecast?q=${city},${country}&appid=${apiKey}&units=metric`;


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

function formatDateForecast(date){
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    let day = days[date.getDay()];
    return `${day}`;
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

    document.getElementById("body").classList.remove("Clear");
    document.getElementById("body").classList.remove("Clouds");
    document.getElementById("body").classList.remove("Rain");

    document.getElementById("body").classList.add(response.data.weather[0].main);
}

function refreshWeatherForecast(response){
    dayPlusOne.innerHTML = formatDateForecast(new Date(response.data.list[1].dt * 1000));
    dayPlusTwo.innerHTML = formatDateForecast(new Date(response.data.list[9].dt * 1000));
    dayPlusThree.innerHTML = formatDateForecast(new Date(response.data.list[17].dt * 1000));
    dayPlusFour.innerHTML = formatDateForecast(new Date(response.data.list[25].dt * 1000));
    tempForecastOne.innerHTML = Math.round(response.data.list[1].main.temp_min);
    tempForecastTwo.innerHTML = Math.round(response.data.list[9].main.temp_max);
    tempForecastThree.innerHTML = Math.round(response.data.list[17].main.temp_min);
    tempForecastFour.innerHTML = Math.round(response.data.list[25].main.temp_max);
    tempForecastDescriptionOne.innerHTML = response.data.list[1].weather[0].main;
    tempForecastDescriptionTwo.innerHTML = response.data.list[9].weather[0].main;
    tempForecastDescriptionThree.innerHTML = response.data.list[17].weather[0].main;
    tempForecastDescriptionFour.innerHTML = response.data.list[25].weather[0].main;
    }

//Function to make search get the API response of what we put on search
function search(city){
    let apiUrl = `${apiRoot}/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(refreshWeather);

   let apiForecastUrl = `${apiRoot}/forecast?q=${city},${country}&appid=${apiKey}&units=metric`;
    axios.get(apiForecastUrl).then(refreshWeatherForecast);

}

//Function to make sure that we get an alert if no city is inserted on search
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
    let apiUrl = `${apiRoot}/weather?lon=${position.coords.longitude}&lat=${position.coords.latitude}&appid=${apiKey}&units=metric`;
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


