# Weather Dashboard

The project can be found at the following link: https://totoero.github.io/weatherDash/

This weather dashboard is developed for the user to pull weather data using the OpenWeather API. By typing in the city into the search field, the user is able to find the current weather and 5 day forecast.

The code works by utilizing form elements in the HTML to submit the requested city, and processing that using the OpenWeather's GeoCode API to find coordinates data. The coordinates are then passed to the OpenWeather API to pull weather information. All HTML elements presenting the weather are generated using JavaScript. The user is able to check the weather on previously searched cities by clicking buttons generated under the search bar.

![A user searches for weather data from Irvine, then San Diego. The weather for both cities appear after each search. They then proceed to check Irvine's weather data again by clicking the Irvine button. Afterwards, they search 'Test' but are met with an error because the city is not found](./assets/weatherDashboard.gif)
