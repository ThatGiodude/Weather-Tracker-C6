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
        console.error("Error Fetching Data", Error);
        alert("Error fetching Data. Try again.");
    });
}