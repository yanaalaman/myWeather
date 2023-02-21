//=================================
// MAIN LETs
//================================
let cityName;
let tempHTML;
let humidity
let weatherDesc
let weatherIconUrl
let windspeedKmph
let temp_C
let city
let currentWeatherImg
let cityTime
let todayPlus1date
let todayPlus1tempmax
let todayPlus1tempmin
let todayPlus1img

let todayPlus2date
let todayPlus2tempmax
let todayPlus2tempmin
let todayPlus2img

let todayPlus3date
let todayPlus3tempmax
let todayPlus3tempmin
let todayPlus3img

let todayPlus4
let todayPlus5


// API Section
let apiKey = "ac2f5c0684a04511bc834115231002";
let apiUrl = `https://api.worldweatheronline.com/premium/v1/weather.ashx?key=${apiKey}&format=json`;


//=================================
// Global Functions section
//=================================
function capitalizeName(name) {
  return name.replace(/\b(\w)/g, (s) => s.toUpperCase());
}


// Time functions
let date = new Date();
let seconds = date.getSeconds();
let minutes = date.getMinutes();
let hour = date.getHours();
let year = date.getFullYear();
let month = date.getMonth(); // beware: January = 0; February = 1, etc.
let day = date.getDate();
let dayOfWeek = date.getDay(); // Sunday = 0, Monday = 1, etc.
let milliSeconds = date.getMilliseconds();
var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];


// Check city and change HTML
function checkCity() {
  cityName = document.getElementById("cityInput").value.toLowerCase();
  console.log(cityName);
  cityName = capitalizeName(cityName);
  axios.get(apiUrl + "&q=" + cityName).then(getWeather);
  return cityName;
}

// Change HTML upon City function
function changeHTMLbyCity(cityName) {
  document.getElementById("cityID").innerText = city;
  document.getElementById("humidity").innerText = humidity;
  document.getElementById("weatherDesc").innerText = weatherDesc;
  document.getElementById("windspeedKmph").innerText = windspeedKmph;
  document.getElementById("tempHTML").innerText = temp_C+"°";
  //document.getElementById("current_time").innerText = `${days[dayOfWeek]} ${hour}:${minutes}`;
  document.getElementById("current_time").innerText = cityTime;
  document.getElementById("currentWeatherImg").src = currentWeatherImg;

  // Forecast Weather 
  document.getElementById("dayPlus1").innerText = todayPlus1date;
  document.getElementById("dayPlus1tempMin").innerText = "Min:"+todayPlus1tempmin+"°";
  document.getElementById("dayPlus1tempMax").innerText = "Max:"+todayPlus1tempmax+"°";

  document.getElementById("dayPlus2").innerText = todayPlus2date;
  document.getElementById("dayPlus2tempMin").innerText = "Min:"+todayPlus2tempmin+"°";
  document.getElementById("dayPlus2tempMax").innerText = "Max:"+todayPlus2tempmax+"°";

}

// Get weather and change HTML
function getWeather(response) {
  console.log(response);
  currentWeatherImg = response.data.data.current_condition[0].weatherIconUrl[0].value;
  humidity = response.data.data.current_condition[0].humidity;
  weatherDesc = response.data.data.current_condition[0].weatherDesc[0].value;
  weatherIconUrl = response.data.data.current_condition[0].weatherIconUrl[0].value;
  windspeedKmph = response.data.data.current_condition[0].windspeedKmph;
  city = response.data.data.request[0].query;
  temp_C = response.data.data.current_condition[0].temp_C;
  cityTime = response.data.data.current_condition[0].observation_time;
  
  // Forecast Weather 
  todayPlus1date = response.data.data.weather[0].date;
  console.log(todayPlus1date);
  todayPlus1tempmax = response.data.data.weather[0].maxtempC;
  todayPlus1tempmin = response.data.data.weather[0].mintempC;

  todayPlus2date = response.data.data.weather[1].date;
  todayPlus2tempmax = response.data.data.weather[1].maxtempC;
  todayPlus2tempmin = response.data.data.weather[1].mintempC;

  
  // change HTML
  changeHTMLbyCity(cityName);

}
