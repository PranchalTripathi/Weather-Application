
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.post('/server.js', (req, res) => {
    res.send('POST request received!');
  });
  
const PORT = process.env.PORT || 8000;
app.use(express.static('public'));

// Endpoint for weather data
app.get('/weather', async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.API_KEY;

    if (!city) {
        return res.status(400).json({ error: "City parameter is required" });
    }

    try {
        // Make a request to the weather API
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather`, {
            params: {
                q: city,
                appid: apiKey,
                units: 'metric'
            }
        });

        // Send the weather data to the client
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching weather data" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
