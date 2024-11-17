// index.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Route to get weather data
app.get('/weather', async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.API_KEY;

    if (!city) {
        return res.status(400).json({ error: 'City name is required' });
    }

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        const data = response.data;

        // Structure the data to be sent to the frontend
        const weatherData = {
            city: data.name,
            date: new Date().toLocaleDateString(),
            temperature: data.main.temp,
            minTemp: data.main.temp_min,
            maxTemp: data.main.temp_max,
            description: data.weather[0].main,
        };

        res.json(weatherData);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching weather data' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
