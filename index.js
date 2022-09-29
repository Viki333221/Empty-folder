let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let date = now.getDate();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let dateToday = document.querySelector("#dateToday");
dateToday.innerHTML = `${day}, ${month} ${date}`;
let time = document.querySelector("#time");
time.innerHTML = `${hour}:${minutes}`;

function cityName(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityInput.value}`;
}

function celsiusTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  let temperatureConverted = temperature.innerHTML;
  temperatureConverted = Number(temperatureConverted);
  let celsiusTemperature = Math.round(((temperatureConverted - 32) * 5) / 9);
  temperature.innerHTML = celsiusTemperature;
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", celsiusTemperature);

function fahrenheitTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  let temperatureConverted = temperature.innerHTML;
  temperatureConverted = Number(temperatureConverted);
  let fahrenheitTemperature = Math.round((temperatureConverted * 9) / 5 + 32);
  temperature.innerHTML = fahrenheitTemperature;
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", fahrenheitTemperature);

function currentWeather(response) {
  let city = document.querySelector("h1");
  city.innerHTML = response.data.name;
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} MPH`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)}%`;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].main;
}
function mainscreenCity(currentCity) {
  let apiKey = "930a3a9d32117e6afd045c48755b3db9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(currentWeather);
}

function search(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#city-search").value;
  mainscreenCity(currentCity);
}

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", search);

function myCurrentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "930a3a9d32117e6afd045c48755b3db9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;
  axios
    .get(`${apiUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
    .then(currentWeather);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(myCurrentPosition);
}
let currentPosition = document.querySelector("#current");
currentPosition.addEventListener("click", getCurrentPosition);

mainscreenCity("Miami");
