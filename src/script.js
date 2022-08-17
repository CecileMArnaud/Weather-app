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

//to retrieve the weather information and the date from the API
function getWeather(response) {
	console.log(response);
	formatDate(response.data.dt);
	let temperature = response.data.main.temp;
	let humidity = response.data.main.humidity;
	let wind = response.data.wind.speed;
	let todayDate = document.querySelector("#today-date");
	todayDate.innerHTML = `${currentDayName} ${currentHour}:${currentMinute}`;
	city = response.data.name;
	let cityName = document.querySelector("#city-name");
	cityName.innerHTML = `${city}`;
	let mainTemperature = document.querySelector(".main-temperature");
	mainTemperature.innerHTML = `${Math.round(temperature)} ˚C`;
	let mainHumidity = document.querySelector(".main-humidity");
	mainHumidity.innerHTML = `${Math.round(humidity)} %`;
	let mainWind = document.querySelector(".main-wind");
	mainWind.innerHTML = `${Math.round(wind)}km/h`;
}

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

//to retrieve the search value and pass it into the API request
function searching(event) {
	event.preventDefault();
	let searchCity = document.querySelector("#search-city");
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${searchCity.value}&units=metric`;
	axios.get(apiUrl).then(getWeather);
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
