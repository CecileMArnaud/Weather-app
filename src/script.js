//to format the date into a simplified version
function formatDate(timestamp) {
	let date = new Date(timestamp * 1000);
	let dayName = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	currentDayName = dayName[date.getDay()];
	if (date.getHours() < 10) {
		currentHour = `0${date.getHours()}`;
	} else {
		currentHour = date.getHours();
	}

	if (date.getMinutes() < 10) {
		currentMinute = `0${date.getMinutes()}`;
	} else {
		currentMinute = date.getMinutes();
	}
}

function getDayName(timestamp) {
	let date = new Date(timestamp * 1000);
	let dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	return dayName[date.getDay()];
}

//to get the default location
function getDefault() {
	navigator.geolocation.getCurrentPosition(getLocation);
}

//to get the default location on load or the current location when clicking the button
function getLocation(position) {
	lat = position.coords.latitude;
	lon = position.coords.longitude;
	let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
	axios.get(url).then(getWeather);
}

//to retrieve the search value and pass it into the API request
function searching(event) {
	event.preventDefault();
	let searchCity = document.querySelector("#search-city");
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${searchCity.value}&units=metric`;
	axios.get(apiUrl).then(getWeather);
}

function getForecast(coordinates) {
	let coordinatesURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
	axios.get(coordinatesURL).then(showForecast);
}

//to retrieve the weather information and the date from the API
function getWeather(response) {
	formatDate(response.data.dt);
	let temperature = response.data.main.temp;
	celsiusTemperature = response.data.main.temp;
	let humidity = response.data.main.humidity;
	let wind = response.data.wind.speed;
	let todayDate = document.querySelector("#today-date");
	todayDate.innerHTML = `${currentDayName} ${currentHour}:${currentMinute}`;
	city = response.data.name;
	let cityName = document.querySelector("#city-name");
	cityName.innerHTML = `${city}`;
	let mainTemperature = document.querySelector(".main-temperature");
	mainTemperature.innerHTML = `${Math.round(temperature)}`;
	let mainHumidity = document.querySelector(".main-humidity");
	mainHumidity.innerHTML = `${Math.round(humidity)} %`;
	let mainWind = document.querySelector(".main-wind");
	mainWind.innerHTML = `${Math.round(wind)}km/h`;
	let mainIcon = document.querySelector(".main-icon img");
	mainIcon.setAttribute(
		"src",
		`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	);
	mainIcon.setAttribute("alt", `${response.data.weather[0].description}`);
	let mainDescription = document.querySelector(".main-description");
	mainDescription.innerHTML = response.data.weather[0].description;
	getForecast(response.data.coord);
}

function showFTemperature(event) {
	event.preventDefault();
	celsiusLink.classList.remove("active");
	fahrenheitLink.classList.add("active");
	let mainTemperature = document.querySelector(".main-temperature");
	let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
	mainTemperature.innerHTML = Math.round(fahrenheitTemperature);
}

function showCTemperature(event) {
	event.preventDefault();
	celsiusLink.classList.add("active");
	fahrenheitLink.classList.remove("active");
	let mainTemperature = document.querySelector(".main-temperature");
	mainTemperature.innerHTML = Math.round(celsiusTemperature);
}

//show Forecast HTML
function showForecast(response) {
	let forecast = response.data.list;
	let forecastElement = document.querySelector("#forecast");
	let forecastHTML = `<div class="row"><h4>In the next few days</h4>`;

	forecast.forEach(function (forecastDay, index) {
		if (
			index === 0 ||
			index === 8 ||
			index === 16 ||
			index === 24 ||
			index === 32
		) {
			forecastHTML =
				forecastHTML +
				`
			<div class="card" style="max-width: 20%">
			<img src="http://openweathermap.org/img/wn/${
				forecastDay.weather[0].icon
			}@2x.png"></img>
			<div class="card-body">
			<h4 class="forecast">${Math.round(forecastDay.main.temp)} ˚C</h4>
			<p class="forecast-label">${getDayName(forecastDay.dt)}</p>
			</div>
			</div>`;
		}
	});
	forecastHTML = forecastHTML + `</div>`;
	forecastElement.innerHTML = forecastHTML;
}

//some default global variables
let lat = "43.4801";
let lon = "-1.5556";
let city = "Select a city...";
let apiKey = "3834107558d00b81fea1969225682a38";
let currentDayName = "Monday";
let currentHour = "00";
let currentMinute = "00";

//to load the default weather on load
getDefault();

//to launch the searching function when submitting a search query
let searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", searching);

// to get back to the default current location after clicking on the button
let myLocation = document.querySelector(".current-location");
myLocation.addEventListener("click", getDefault);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCTemperature);

let celsiusTemperature = null;
