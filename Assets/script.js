const api = {
    key: "e908936ed60f687acaebd23e72e9ffb8",
    base: "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}"
};

const search = document.querySelector(".search");
const btn = document.querySelector(".btn");

btn.addEventListener("click", getInput)

function getInput (event) {
    event.preventDefault();
    if (event.type === "click") {
        getData(search.value)
    }
}

function getData(city) {
    fetch(`${api.base}?q=${city}&units=metrics&appid=${api.key}`)
    .then(response => {
        return response.json();
    })
    .then(displayData)
}

function displayData( response) {
    if (response.cod === "404") {
        const error = document.querySelector(.error)
        error.textContent = "Please Enter a Valid City Name"
    }
}
