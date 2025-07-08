// main.js

document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    initWeatherComponent();
    initSpinTheWheelComponent();
    initBillSplitterComponent();
    initMoneyTrackerComponent();
    initDashboardComponent();
    initAdminPanelComponent();
    initItineraryComponent();
});

function initWeatherComponent() {
    // Fetch and display weather information for Baguio
    const weatherElement = document.getElementById('weather');
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Baguio&appid=YOUR_API_KEY&units=metric')
        .then(response => response.json())
        .then(data => {
            const weatherInfo = `Temperature: ${data.main.temp}°C, Weather: ${data.weather[0].description}`;
            weatherElement.innerText = weatherInfo;
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function initSpinTheWheelComponent() {
    const spinButton = document.getElementById('spin-button');
    const wheel = document.getElementById('wheel');

    spinButton.addEventListener('click', () => {
        const randomDegree = Math.floor(Math.random() * 360 + 720); // Spin at least 2 full rotations
        wheel.style.transition = 'transform 4s ease-out';
        wheel.style.transform = `rotate(${randomDegree}deg)`;
    });
}

function initBillSplitterComponent() {
    // Logic for bill splitting
}

function initMoneyTrackerComponent() {
    // Logic for money tracking
}

function initDashboardComponent() {
    // Logic for personalized dashboard
}

function initAdminPanelComponent() {
    // Logic for admin panel
}

function initItineraryComponent() {
    // Logic for itinerary management
}