const apikey = config.apikey;
const apiUrl = config.apiUrl;

const cityInput = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");

async function loadWeather(city) {
    const response = await fetch(`${apiUrl}${city}&appid=${apikey}`);

    const data = await response.json();

    const cityName = data.name;
    const temp = Math.round(data.main.temp);
    const wind = data.wind.speed;
    const humidity = data.main.humidity;

    document.querySelector(".city").textContent = cityName;
    document.querySelector(".temp").textContent = `${temp}°C`;
    document.querySelector(".wind h4").textContent = `${wind}Km/h`;
    document.querySelector(".humidity h4").textContent = `${humidity}%`;
}

searchButton.addEventListener("click", () => loadWeather(cityInput.value));
cityInput.addEventListener("keydown", e => {
    if (e.key === "Enter") loadWeather(cityInput.value);
});