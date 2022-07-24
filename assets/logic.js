



// Initialize Variables
var cityHistoryEl = document.getElementById('cityHistory');
var currentCityEl = document.getElementById('currentCity');
var forecastEl = document.getElementById('forecast');
var searchBt = document.getElementById('citySearch');
var searchedCity = document.getElementById('searchedCity');
var apiKey = '8c23fe974a76c1318a70cd6439fe8072'
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
        const a = await geocodeFetch
        var lat = a[0].lat;
        var lon = a[0].lon;
        console.log(a);
        weatherDataAPI(lat, lon);

    }

    getWeather()
}

function weatherDataAPI(lat,lon) {
    var weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,hourly,minutely,alerts&appid=${apiKey}`
    console.log(weatherURL)
    
}

// Pulls the coordinates based off of search query
// const geocodeFetch = fetch(URL)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         return data;
//     });


// // The following function accesses the lat and lon data and passes it to the weather data API 
// // The following function was inspired by: https://dev.to/ramonak/javascript-how-to-access-the-return-value-of-a-promise-object-1bck
// async function getWeather() {
//     const coordinates = await geocodeFetch;
//     console.log(geocodeFetch)
//     var lat = coordinates[0].lat;
//     var lon = coordinates[0].lon;
//     var weatherURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
//     const weatherData = fetch(weatherURL)
//         .then(function(response) {
//             return response.json();
//         })
//         .then(function(data) {
//             console.log(data)
//             return data;
//         })
//     console.log(weatherData)

// }
// getWeather()


// Search city weather function
function searchCity(event) {
    event.preventDefault();
    var city = searchedCity.value;
    var apiURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city},US&appid=${apiKey}`;
    openweatherAPI(apiURL);

};





// console.log(searchedCity)


// Add event listeners for buttons
searchBt.addEventListener('click', searchCity)

