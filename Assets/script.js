function getWeather() {
    const apiKey = "39c52ddcf7d4f2000cdac51488dc102f";
    const city = document.getElementById('city').value;

    if(!city) {
        alert('Please Enter a Valid City Name');
        return;
    }

    const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherURL)
    .then(response => response.json())
    .then(data => {
        displayWeather(data);
    })
    .catch(error => {
        console.error("Error Fetching Data", error);
        alert("Error fetching Data. Try again.");
    });

    fetch(forecastURL)
    .then(response => response.json())
    .then(data => {
        displayDailyForecast(data.list);
    })
    .catch(error => {
        console.error('Error fetching daily forecast', error);
        alert('Error fetching daily Forecast Data. Please try again.');
    });
}

function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const dailyForecastDiv = document.getElementById('daily-forecast');
    // clears the content in the field
    weatherInfoDiv.innerHTML = '';
    dailyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML ='';

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconURL = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `
        <p>${temperature}0C</p>
        `;
        const weatherHTML = `
        <p>${cityName}</p>
        <p>${description}</p>
        `;
        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHTML;
        weatherIcon.src = iconURL;
        weatherIcon.alt = description;

        showImage();

    }
}