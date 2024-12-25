function refreshweather(response) {
    let tempElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.city;
    tempElement.innerHTML = Math.round(temperature);
    let skydata = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windspeed = document.querySelector("#speed");
    windspeed.innerHTML = `${response.data.wind.speed}km/hr`;
    skydata.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    let timeEle = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    timeEle.innerHTML = formatdate(date);
    let icon = document.querySelector("#icon");
    icon.innerHTML = `<img src="${response.data.condition.icon_url}"
        class="weather-app-icon"/>`;



}
function formatdate(date) {

    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${day} ${hours}:${minutes}`;
}
function searchCity(city) {
    let apikey = "o1af2t4b5474e5398630b2fc7d4b303b";
    let apiurl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}&units=metric`;
    axios.get(apiurl).then(refreshweather);
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    searchCity(searchInput.value);

}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("Paris");
