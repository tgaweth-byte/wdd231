// Configuration
const CONFIG = {
  key: "95e01d224d23c5bccb00807bc4d6cb8d",
  lat: 18.535082005035434,
  long: -72.33219374094348,
  units: 'metric' // Using metric for Haiti (Celsius)
};

// DOM Elements
const elements = {
  currentTemp: document.getElementById('current-temp'),
  weatherDesc: document.getElementById('weather-desc'),
  humidity: document.getElementById('humidity'),
  windSpeed: document.getElementById('wind-speed'),
  weatherIcon: document.querySelector('.weather-icon'),
  forecastContainer: document.getElementById('forecast-container')
};

// Initialize weather
async function initWeather() {
  try {
    await fetchWeatherData();
    setInterval(fetchWeatherData, 30 * 60 * 1000); // Refresh every 30 minutes
  } catch (error) {
    console.error('Weather initialization error:', error);
    elements.weatherDesc.textContent = 'Weather data unavailable';
  }
}

// Fetch and display weather data
async function fetchWeatherData() {
  try {
    const [current, forecast] = await Promise.all([
      fetchWeather('weather'),
      fetchWeather('forecast')
    ]);
    displayCurrentWeather(current);
    displayForecast(forecast);
  } catch (error) {
    console.error('Weather fetch error:', error);
    elements.weatherDesc.textContent = 'Weather unavailable';
  }
}

// Generic weather fetch function
async function fetchWeather(endpoint) {
  const url = `https://api.openweathermap.org/data/2.5/${endpoint}?lat=${CONFIG.lat}&lon=${CONFIG.long}&units=${CONFIG.units}&appid=${CONFIG.key}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Weather API error: ${response.status}`);
  return response.json();
}

// Display current weather
function displayCurrentWeather(data) {
  const { main, weather, wind, name } = data;

  // Update town/city name if you want to display it
  // document.querySelector('#town')?.textContent = name;

  elements.currentTemp.textContent = Math.round(main.temp);
  elements.weatherDesc.textContent = weather[0].description;
  elements.humidity.textContent = main.humidity;
  elements.windSpeed.textContent = Math.round(wind.speed * 3.6); // Convert m/s to km/h

  // Set weather icon
  const iconCode = weather[0].icon;
  const iconSrc = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  elements.weatherIcon.src = iconSrc;
  elements.weatherIcon.alt = weather[0].description;
}

// Display 3-day forecast
function displayForecast(data) {
  const dailyForecasts = {};

  // Group forecast data by day
  data.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });

    if (!dailyForecasts[day]) {
      dailyForecasts[day] = { temps: [], descriptions: [], icons: [] };
    }

    dailyForecasts[day].temps.push(item.main.temp);
    dailyForecasts[day].descriptions.push(item.weather[0].description);
    dailyForecasts[day].icons.push(item.weather[0].icon);
  });

  // Get next 3 days (excluding today)
  const forecastDays = Object.keys(dailyForecasts).slice(1, 4);

  // Clear loading messages
  elements.forecastContainer.innerHTML = '';

  // Create forecast elements for each day
  forecastDays.forEach(day => {
    const forecast = dailyForecasts[day];
    const avgTemp = Math.round(forecast.temps.reduce((a, b) => a + b) / forecast.temps.length);

    // Find most common weather condition
    const mostCommonDesc = forecast.descriptions.reduce((a, b) => {
      const countA = forecast.descriptions.filter(desc => desc === a).length;
      const countB = forecast.descriptions.filter(desc => desc === b).length;
      return countA >= countB ? a : b;
    });

    // Find icon for the most common condition
    const iconIndex = forecast.descriptions.indexOf(mostCommonDesc);
    const iconCode = forecast.icons[iconIndex];

    const forecastDay = document.createElement('div');
    forecastDay.className = 'forecast-day';
    forecastDay.innerHTML = `
      <div class="day">${day}</div>
      <img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="${mostCommonDesc}">
      <div class="temp">${avgTemp}°C</div>
      <div class="desc">${mostCommonDesc}</div>
    `;

    elements.forecastContainer.appendChild(forecastDay);
  });
}

// Initialize weather when page loads
document.addEventListener('DOMContentLoaded', initWeather);

// Helper: Find most common value in array
function getMostCommon(arr) {
  return arr.reduce((a, b) =>
    arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b
  );
}

// Fetch and display member spotlights
async function fetchSpotlights() {
  try {
    const response = await fetch('data/members.json');
    const members = await response.json();
    displaySpotlights(members);
  } catch (error) {
    console.error('Spotlights fetch error:', error);
    elements.spotlightContainer.innerHTML = '<p>Unable to load featured members.</p>';
  }
}

// Display random gold/silver members
function displaySpotlights(members) {
  const qualified = members.filter(m => m.membershipLevel >= 2);
  const selected = [...qualified].sort(() => Math.random() - 0.5).slice(0, 3);

  elements.spotlightContainer.innerHTML = selected.length ? selected.map(m => `
    <article class="spotlight-card ${m.membershipLevel === 3 ? 'gold' : 'silver'}">
      <div class="spotlight-header">
        <img src="images/${m.image}" alt="${m.name}" class="spotlight-logo">
        <div>
          <h3>${m.name}</h3>
          <span class="spotlight-level">${m.membershipLevel === 3 ? 'Gold' : 'Silver'} Member</span>
        </div>
      </div>
      <div class="spotlight-details">
        <p>📍 ${m.address}</p>
        <p>📞 ${m.phone}</p>
        <p>🏢 ${m.industry}</p>
        <a href="${m.website}" target="_blank" rel="noopener" class="spotlight-website">Visit Website →</a>
      </div>
    </article>
  `).join('') : '<p>No featured members available.</p>';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initHomePage);