function getWeather() {
    const apiKey = "39c52ddcf7d4f2000cdac51488dc102f";
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please Enter a Valid City Name');
        return;
    }

    const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherURL)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        displayWeather(data);
    })
    .catch(error => {
        console.error("Error Fetching Current Weather Data", error);
        alert("Error fetching Current Weather Data. Try again.");
    });

    fetch(forecastURL)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        displayDailyForecast(data.list);
    })
    .catch(error => {
        console.error('Error Fetching Daily Forecast Data', error);
        alert('Error fetching Daily Forecast Data. Please try again.');
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
        <p>${temperature}°C</p>`;

        const weatherHTML = `
        <p>${cityName}</p>
        <p>${description}</p>`;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHTML;
        weatherIcon.src = iconURL;
        weatherIcon.alt = description;

        showImage();

    }
}

function displayDailyForecast(dailyData) {
    const dailyForecastDiv = document.getElementById('daily-forecast');

    const next5days = dailyData.slice(0, 40); // Display the next 5 days (8 data points per day, 5 days * 8 = 40)

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Group forecast data by day
    const dailyForecasts = next5days.reduce((acc, forecast) => {
        const date = new Date(forecast.dt * 1000);
        const dayOfWeek = daysOfWeek[date.getDay()];
        const dayKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

        if (!acc[dayKey]) {
            acc[dayKey] = {
                day: dayOfWeek,
                temperatures: []
            };
        }

        const temperature = Math.round(forecast.main.temp - 273.15);
        acc[dayKey].temperatures.push(temperature);

        return acc;
    }, {});

    // Generate HTML for each day's forecast
    Object.values(dailyForecasts).forEach(({ day, temperatures }) => {
        const averageTemperature = Math.round(temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length);
        const iconCode = dailyData[0].weather[0].icon; // Assuming the icon remains the same for all 5 days
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const dailyItemHtml = `
            <div class="daily-item">
                <span>${day}</span>
                <img src="${iconUrl}" alt="Daily Weather Icon">
                <span>Avg Temp: ${averageTemperature}°C</span>
            </div>
        `;

        dailyForecastDiv.innerHTML += dailyItemHtml;
    });
}



function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block'; // Make the image visible once it's loaded
}