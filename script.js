// API Key di OpenWeatherMap (sostituisci con la tua chiave!)
const WEATHER_API_KEY = "5e584f12fa87cb3dec3988c7924fac39";

// Funzione per aggiornare l'orologio locale
function updateClock() {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let day = now.toLocaleString("it-IT", { weekday: "long" });
    let date = now.getDate().toString().padStart(2, "0") + "/" + 
               (now.getMonth() + 1).toString().padStart(2, "0") + "/" + 
               now.getFullYear();

    hours = hours.toString().padStart(2, "0");
    minutes = minutes.toString().padStart(2, "0");
    seconds = seconds.toString().padStart(2, "0");

    document.getElementById("time").textContent = `${hours}:${minutes}:${seconds}`;
    document.getElementById("date").textContent = `${day}, ${date}`;
}

// Aggiorna l'orologio ogni secondo
setInterval(updateClock, 1000);
updateClock(); // Esegui subito per evitare ritardo iniziale

// Funzione per ottenere i dati meteo
async function getWeatherData(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&lang=it&appid=${WEATHER_API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Errore HTTP: ${response.status}`);
        }

        const data = await response.json();
        return {
    temperature: Math.round(data.main.temp),
    condition: data.weather[0].description,
    location: data.name,
    icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
};
    } catch (error) {
        console.error("Errore nel recupero dei dati meteo:", error);
        alert("Città non trovata. Prova un altro nome.");
        return null;
    }
}

// Funzione per aggiornare l'interfaccia utente con meteo
async function updateWeather(city) {
    const weatherData = await getWeatherData(city);
    if (!weatherData) return;

    document.getElementById("temperature").textContent = `Temperatura: ${weatherData.temperature}°C`;
    document.getElementById("weather-description").textContent = `Condizioni: ${weatherData.condition}`;
const weatherIcon = document.getElementById("weather-icon");
    weatherIcon.src = weatherData.icon;
    weatherIcon.style.display = "block";
}

// Event Listener per il pulsante di ricerca
document.getElementById("search-btn").addEventListener("click", () => {
    const location = document.getElementById("city-input").value.trim();
    if (location === "") {
        alert("Inserisci una città!");
        return;
    }

    updateWeather(location);
});

const inputText = document.getElementById('city-input');
        const outputText = document.getElementById('outputText');

        inputText.addEventListener('input', function() {
            outputText.textContent = inputText.value;
        });
