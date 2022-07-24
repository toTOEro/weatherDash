// Initialize Variables
var cityHistoryEl = document.getElementById('cityHistory');
var currentCityEl = document.getElementById('currentCity');
var forecastEl = document.getElementById('forecast');
var searchBt = document.getElementById('citySearch');
var searchedCity = document.getElementById('searchedCity');
var apiKey = '8c23fe974a76c1318a70cd6439fe8072'
var todayHeaderEl = document.getElementById('today');
var todayWeatherEl = document.getElementById('todayWeather');
var city = "";


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
    var icon = currentWeather.weather[0].icon;
    var weatherID = currentWeather.weather[0].id;
    var dailyInfo = [];
    var date = [];
    var iconURL = `http://openweathermap.org/img/w/${icon}.png`
    clearChildrenNodes(todayWeatherEl);
    clearChildrenNodes(forecastEl);


    // Render Current City Weather
    currentCityEl.setAttribute("class", "border border-dark my-4")


    todayHeaderEl.innerHTML = `Today's weather in <i class="font-weight-bold font-italic">${city}</i>  <img src="${iconURL}">`;

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
            todayWeatherEl.appendChild(weatherLi);
        } else {
            weatherLi.setAttribute("class", "py-1");

            if (value <= 2) {
                weatherLi.innerHTML = `${key}: <i class="bg-success px-2 font-weight-normal">${value}</i>`
                todayWeatherEl.appendChild(weatherLi);

            } else if (3 <= value && value <= 5) {
                weatherLi.innerHTML = `${key}: <i class="bg-warning px-2 font-weight-normal">${value}</i>`
                todayWeatherEl.appendChild(weatherLi);

            } else {
                weatherLi.innerHTML = `${key}: <i class="bg-danger px-2 font-weight-normal">${value}</i>`
                todayWeatherEl.appendChild(weatherLi);
            };
        };
    };

    // Iterating over dailyWeather to pull 5 day forecast
    for (let i = 1; i < 6; i++) {
        const dailyData = {
            minTemp: dailyWeather[i].temp.min,
            maxTemp: dailyWeather[i].temp.max,
            Humidity: dailyWeather[i].humidity,
            UV: dailyWeather[i].uvi,
        };
        const dailyDate = {
            date: moment.unix(dailyWeather[i].dt).format("ddd, MM/DD/YYYY"),
        }
        dailyInfo.push(dailyData);
        date.push(dailyDate);
        console.log(date)
    };

    console.log(dailyWeather)

    // Iterates over 5 day forecast to generate forecast cards
    for (let i = 0; i < dailyInfo.length; i++) {
        const cardEl = document.createElement("div");
        const headerEl = document.createElement("div");
        const cardBodyEl = document.createElement("div");
        const cardInfoEl = document.createElement("ul");
        cardEl.classList.add("card", "flex-fill");
        headerEl.classList.add("card-header", "bg-secondary", "text-white");
        cardBodyEl.classList.add("card-body");
        cardInfoEl.classList.add("card-text")
        const currentInfo = dailyInfo[i];
        headerEl.textContent = date[i].date;
        // Create list

        for (const [key, value] of Object.entries(currentInfo)) {
            const cardInfoLi = document.createElement("li");
            cardInfoLi.textContent = `${key}: ${value}`
            cardInfoEl.appendChild(cardInfoLi);
        };
        cardBodyEl.appendChild(cardInfoEl);
        cardEl.appendChild(headerEl);
        cardEl.appendChild(cardBodyEl);
        forecastEl.appendChild(cardEl);
    }

};


// Clears out previous weather data  
function clearChildrenNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    };
};

// Saves search history by generating a button
function saveHistory(city) {
    var searchHistoryBt = document.createElement("button");
    searchHistoryBt.setAttribute("class", "btn btn-primary my-2 flex-fill");
    searchHistoryBt.textContent = city;

    cityHistoryEl.appendChild(searchHistoryBt);
    console.log({ cityHistoryEl })
}

// Corrects capitalization 
function fixCapitalization(word) {
    words = word.toLowerCase();
    splitWords = words.split(" ");
    for (let i = 0; i < splitWords.length; i++) {
        splitWords[i] = splitWords[i][0].toUpperCase() + splitWords[i].substr(1);
    };
    words = splitWords.join(" ");
    return words
}

// Search city weather function
function searchCity(event) {
    event.preventDefault();
    city = fixCapitalization(searchedCity.value);
    var apiURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city},US&appid=${apiKey}`;
    openweatherAPI(apiURL);
    saveHistory(city);

};


// Add event listeners for buttons
searchBt.addEventListener('click', searchCity)

