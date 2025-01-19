
async function fetchWeather(city) {
    try {
        const response = await fetch(`/weather?city=${city}`);
        console.log(response);
        if (!response.ok) throw new Error("City not found");
        
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error("Error:", error);
    }
}

function displayWeather(data) {
    document.querySelector(".city").textContent = data.name;
    document.querySelector(".degrees span").textContent = data.main.temp + "°C";
    document.querySelector(".d-type").textContent = data.weather[0].main;
    document.querySelector(".d-range").textContent = `Min: ${data.main.temp_min}°C / Max: ${data.main.temp_max}°C`;
    document.querySelector(".l-date").textContent = new Date().toLocaleDateString();
}

document.querySelector(".input-search").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const city = event.target.value;
        fetchWeather(city);
    }
});

function clearResult() {
    document.querySelector(".city").textContent = '';
    document.querySelector(".degrees span").textContent = '';
    document.querySelector(".d-type").textContent = '';
    document.querySelector(".d-range").textContent = '';
    document.querySelector(".l-date").textContent = '';
    document.querySelector(".input-search").value = '';
}

        
