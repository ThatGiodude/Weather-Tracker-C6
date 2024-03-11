const api = {
    key: "e908936ed60f687acaebd23e72e9ffb8",
    base: "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}"
};

const search = document.querySelector(".search");
const btn = document.querySelector(".btn");

btn.addEventListener("click", getInput)
