function displayWeather(response) {
  let temperatureInput = document.querySelector("#city-temp");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city-name");
  let conditionsInput = document.querySelector("#city-conditions");
  let detailInput = document.querySelector("#current-details");
  let timeInput = document.querySelector("#city-date");
  date = new Date(response.data.time * 1000);

  let iconElement = document.querySelector("#icon");

  let pressure = Math.round(response.data.temperature.pressure);
  let humidity = Math.round(response.data.temperature.humidity);
  let wind = Math.round(response.data.wind.speed);

  temperatureInput.innerHTML = `${Math.round(temperature)}`;
  cityElement.innerHTML = response.data.city;
  timeInput.innerHTML = formatDate(date);
  conditionsInput.innerHTML = response.data.condition.description;
  detailInput.innerHTML = `Pressure: <strong>${pressure}</strong> Humidity: <strong>${humidity}%</strong> Wind: <strong>${wind} mps</strong>`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;
}

function searchCity(city) {
  let apiKey = "3af237t6810483eo486b71736a808a31";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  let currentDate = date.getDate();

  let months = [
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

  let month = months[date.getMonth()];

  return `${day} ${currentDate} ${month} ${hours}:${minutes}`;
}

function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="weather-forecast">
        <div class="forecast-date">${day}</div><br />
        <div class="forecast-icon">🌤️</div><br />
        <div class="forecast-temp"><br />
          <div class="forecast-temp-max">
            <strong>15º</strong>
          </div>
          <div class="forecast-temp-min">9º</div>
        </div>
      </div>
    `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormInput = document.querySelector("#search-form");
searchFormInput.addEventListener("submit", handleSearchSubmit);

searchCity("The Hague");
displayForecast();
