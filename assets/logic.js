// Initialize Variables
var cityHistoryEl = document.getElementById('cityHistory');
var currentCityEl = document.getElementById('currentCity');
var forecastEl = document.getElementById('forecast');
var searchBt = document.getElementById('citySearch');
var searchedCity = document.getElementById('searchedCity');
var apiKey = '8c23fe974a76c1318a70cd6439fe8072'
var todayHeaderEl = document.getElementById('today');
var todayWeatherEl = document.getElementById('todayWeather')
let locationData;


// OpenWeather API Call
function openweatherAPI(URL) {

    // Pulls the coordinates based off of search query
    const geocodeFetch = fetch(URL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            return data;
        });


    // The following function accesses the lat and lon data and passes it to the weather data API 
    // The following function was inspired by: https://dev.to/ramonak/javascript-how-to-access-the-return-value-of-a-promise-object-1bck
    async function getWeather() {
        const geoData = await geocodeFetch
        var lat = geoData[0].lat;
        var lon = geoData[0].lon;
        weatherDataAPI(lat, lon);

    };

    getWeather();
};

// weatherDataAPI() pulls weather data from the lat and lon specified
function weatherDataAPI(lat, lon) {
    var weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

    const weatherFetch = fetch(weatherURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            return data;
        });

    async function weatherCall() {
        const weatherData = await weatherFetch;
        renderWeather(weatherData)
    };
    weatherCall();
};

// renderWeather() renders the weather onto the webpage
function renderWeather(data) {
    var currentWeather = data.current;
    var dailyWeather = data.daily;
    clearChildrenNodes(todayWeatherEl);


    // Render Current City Weather
    currentCityEl.setAttribute("class", "border border-dark my-4")

    const todayData = {
        Temp: currentWeather.feels_like + " °F",
        Wind: currentWeather.wind_speed + " MPH",
        Humidity: currentWeather.humidity + " %",
        UV: currentWeather.uvi,

    }

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
    for (const [key, value] of Object.entries(todayData)) {
        const weatherLi = document.createElement("li");

        // If statement to format the UV Index based off of intensity
        if (key !== "UV") {
            weatherLi.textContent = `${key}: ${value}`;
            weatherLi.setAttribute("class", "py-1");
            todayWeatherEl.appendChild(weatherLi)
        } else {
            weatherLi.setAttribute("class", "py-1");

            if (value <= 2) {
                weatherLi.innerHTML = `${key}: <i class="bg-success px-2 font-weight-normal">${value}</i>`
                todayWeatherEl.appendChild(weatherLi)

            } else if (3 <= value && value <= 5) {
                weatherLi.innerHTML = `${key}: <i class="bg-warning px-2 font-weight-normal">${value}</i>`
                todayWeatherEl.appendChild(weatherLi)

            } else {
                weatherLi.innerHTML = `${key}: <i class="bg-danger px-2 font-weight-normal">${value}</i>`
                todayWeatherEl.appendChild(weatherLi)
            };
        };
    };
};


function clearChildrenNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    };
};


// Temporary reference 
let unix_timestamp = 1549312452
// Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
var date = new Date(unix_timestamp * 1000);
// Hours part from the timestamp
var hours = date.getHours();
// Minutes part from the timestamp
var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

console.log(formattedTime);



// Search city weather function
function searchCity(event) {
    event.preventDefault();
    var city = searchedCity.value;
    var apiURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city},US&appid=${apiKey}`;
    openweatherAPI(apiURL);

};



// Add event listeners for buttons
searchBt.addEventListener('click', searchCity)

