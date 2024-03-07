function getWeather() {
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9fd7a449d055dba26a982a3220f32aa2`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=9fd7a449d055dba26a982a3220f32aa2`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });
}
    
function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const additionalContainer = document.getElementById('additional-container');

    // Clear previous content
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';
    additionalContainer.innerHTML = ''; // Clear previous content in the additional container

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const country = data.sys.country;
        const temperature = Math.round(data.main.temp - 273.15); // Convert to Celsius
        const maxtemp = Math.round(data.main.temp_max - 273.15);
        const mintemp = Math.round(data.main.temp_min - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
        const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        const temperatureHTML = `<p>${temperature}°C</p>`;
        const weatherHtml = `<p>${cityName}, ${country}</p><p>${description}</p>`;
        const coorlon = data.coord.lon
        const coorlat = data.coord.lat
        const timezone = data.timezone/3600
        const visibility = data.visibility
        const mapLink = `https://www.google.com/maps/search/?api=1&query=${coorlat},${coorlon}`;

        // Append temperature and weather info to their respective containers
        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        // Call the showImage function if needed
        showImage();

        // Example: Adding more information to the additional container
        const additionalInfoHtml = `
    <table border="1">
        <tr>
            <th colspan="3">Additional Information:</th>
        </tr>
        <tr>
            <td>Coordinate:</td>
            <td>Longitude: ${coorlon}</td>
            <td>Latitude: ${coorlat}</td>
        </tr>
        <tr>
            <td>Humidity:</td>
            <td>${data.main.humidity}%</td>
            <td>Wind Speed: ${data.wind.speed} m/s</td>
        </tr>
        <tr>
            <td>Max Temperature:</td>
            <td>${maxtemp}°C</td>
            <td>Min Temperature: ${mintemp}°C</td>
        </tr>
        <tr>
            <td>Sunrise:</td>
            <td>${sunriseTime}</td>
            <td>Sunset: ${sunsetTime}</td>
        </tr>
        <tr>
            <td>Timezone:</td>
            <td>GMT+${timezone}</td>
            <td>Visibility: ${visibility} m</td>
        </tr>
        <tr>
            <th colspan="3"><a href="${mapLink}" target="_blank">View on Map</a></th>
        </tr>

    </table>
`;
        // Append additional information to the additional container
        additionalContainer.innerHTML = additionalInfoHtml;
    }
}


function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    const next24Hours = hourlyData.slice(0, 8); // Display the next 24 hours (3-hour intervals)

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block'; // Make the image visible once it's loaded
}
