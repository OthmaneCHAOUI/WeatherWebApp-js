const apikey = config.apikey;
const apiUrl = config.apiUrl;

const cityInput = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");

async function loadWeather(city) {
    if (!city.trim()) {
        alert("Please enter a city name.");
        return;
    }

    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apikey}`);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();

        const cityName = data.name;
        const temp = Math.round(data.main.temp);
        const wind = data.wind.speed;
        const humidity = data.main.humidity;

        document.querySelector(".city").textContent = cityName;
        document.querySelector(".temp").textContent = `${temp}°C`;
        document.querySelector(".wind h4").textContent = `${wind}Km/h`;
        document.querySelector(".humidity h4").textContent = `${humidity}%`;

        // Show the card content with animation
        const cardContent = document.querySelector('.card-content');
        cardContent.classList.remove('hidden');
        cardContent.classList.add('visible');

        updateWeather(data.weather[0].main)
    } catch (error) {
        alert("City not found. Please try another city.");
    }
}

function updateWeather(weather){
    let bgImage = "images/cloudy2.jpg";
    
    if (weather === "Clear") {
        bgImage = "images/clear-sky.jpg";
    } else if (weather === "Rain") {
        bgImage = "images/rainy-sky.webp";
    } else if (weather === "Snow") {
        bgImage = "images/snowy-sky.webp";
    }

    document.body.style.backgroundImage = `url('${bgImage}')`;
}

searchButton.addEventListener("click", () => loadWeather(cityInput.value));
cityInput.addEventListener("keydown", e => {
    if (e.key === "Enter") loadWeather(cityInput.value);
});