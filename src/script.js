let date = new Date();
let dayName = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
let monthName = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
let currentDayName = dayName[date.getDay()];
let currentMonth = monthName[date.getMonth()];
let currentHour = date.getHours();
let currentMinute = date.getMinutes();
let apiKey = "3834107558d00b81fea1969225682a38";

function passToday() {
	let todayDate = document.querySelector("#today-date");
	todayDate.innerHTML = `${currentDayName} ${currentHour}:${currentMinute}`;
}

passToday();

function searching(event) {
	event.preventDefault();
	let searchCity = document.querySelector("#search-city");
	console.log(searchCity.value);
	let cityName = document.querySelector("#city-name");
	cityName.innerHTML = `${searchCity.value} : `;
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${searchCity.value}&units=metric`;
	axios.get(apiUrl).then(getWeather);
}

function getWeather(response) {
	let temperature = response.data.main.temp;
	let humidity = response.data.main.humidity;
	let wind = response.data.wind.speed;
	console.log(response);
	console.log(Math.round(temperature));
	let mainTemperature = document.querySelector(".main-temperature");
	mainTemperature.innerHTML = `${Math.round(temperature)} ˚C`;
	let mainHumidity = document.querySelector(".main-humidity");
	mainHumidity.innerHTML = `${Math.round(humidity)} %`;
	let mainWind = document.querySelector(".main-wind");
	mainWind.innerHTML = `${Math.round(wind)}km/h`;
}

let searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", searching);

function getLocation(position) {
	let lat = position.coords.latitude;
	let lon = position.coords.longitude;
	let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
	axios.get(url).then(defaultWeather);
}

function defaultWeather(response) {
	console.log(response);
	let temperature = response.data.main.temp;
	let humidity = response.data.main.humidity;
	let wind = response.data.wind.speed;
	let city = response.data.name;
	let cityName = document.querySelector("#city-name");
	cityName.innerHTML = `${city} : `;
	let mainTemperature = document.querySelector(".main-temperature");
	mainTemperature.innerHTML = `${Math.round(temperature)} ˚C`;
	let mainHumidity = document.querySelector(".main-humidity");
	mainHumidity.innerHTML = `${Math.round(humidity)} %`;
	let mainWind = document.querySelector(".main-wind");
	mainWind.innerHTML = `${Math.round(wind)}km/h`;
}

navigator.geolocation.getCurrentPosition(getLocation);

function changeToDefault(event) {
	navigator.geolocation.getCurrentPosition(getLocation);
}

let myLocation = document.querySelector(".current-location");
myLocation.addEventListener("click", changeToDefault);
