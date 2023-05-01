//import * as dotenv from "./node_modules/dotenv";
require("dotenv").config();
//dotenv.config();
const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", () => {
  const APIKey = process.env.WEATHER_API_KEY;
  const city = document.querySelector(".search-box input").value;

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        container.style.height = "590px";
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      //Can be optimized with regex
      //You can use 1 more switch case to me more preceise
      //showing a more accurate picture
      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/day.svg";
          break;
        case "Rain":
          image.src = "images/rainy-6.svg";
          break;
        case "Snow":
          image.src = "images/snowy-5.svg";
          break;
        case "Clouds":
          image.src = "images/cloudy-day-2.svg";
          break;
        case "Haze":
          image.src = "images/day.svg";
          break;
        case "Extreme":
          image.src = "images/thunder.svg";
          break;
        case "Mist":
          image.src = "images/weather.svg";
          break;

        default:
          image.src = "";
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;

      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${json.wind.speed}Km/h`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "700px";
    });
});
