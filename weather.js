document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "06daa443cbba20208d9ce537b29a5e1d";
  const searchButton = document.querySelector(".search");
  const weatherDetailsContainer = document.querySelector(".weather-details");
  const weatherImageContainer = document.querySelector(".weather-image");
const weatherContainer= document.querySelector(".weather-container");
  searchButton.addEventListener("click", function () {
    const cityInput = document.getElementById("city").value;
    getWeather(cityInput, apiKey);
  });

  function getWeather(city, apiKey) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === "404") {
          // Handle city not found
          weatherDetailsContainer.innerHTML = `<p>City not found. Please try again.</p>`;
          weatherImageContainer.innerHTML = ""; // Clear previous content
        } else {
          // Display all weather details
          weatherDetailsContainer.innerHTML = `<h3>Weather Details</h3>`;
          for (const key in data.main) {
            if (data.main.hasOwnProperty(key)) {
              weatherDetailsContainer.innerHTML += `<p>${key}: ${data.main[key]}</p>`;
            }
          }

          // Display the weather icon
          weatherImageContainer.innerHTML = `<div class="icon">
                                              <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="weather-icon">
                                              <h4 style="text-align: center;">${data.weather[0].description}</h4>
                                           </div>`;

          // Show the weather container
          weatherContainer.style.display = "flex";
          weatherDetailsContainer.style.display = "inline-block";
          weatherImageContainer.style.display = "inline-block";
        }
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }
});
