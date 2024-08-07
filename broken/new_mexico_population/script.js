// Initialize the map
var map = L.map('map').setView([34.5, -106], 7);

// Set up the OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Top 100 largest cities in New Mexico with latitude, longitude, and population
var cities = [
    { name: 'Albuquerque', lat: 35.0844, lon: -106.6504, population: 545852 },
    { name: 'Las Cruces', lat: 32.3199, lon: -106.7637, population: 97618 },
    { name: 'Rio Rancho', lat: 35.2328, lon: -106.6635, population: 87654 },
    { name: 'Santa Fe', lat: 35.6869752, lon: -105.937799, population: 84112 },
    { name: 'Roswell', lat: 33.3943, lon: -104.523, population: 48266 },
    // Add more cities here up to the top 100
];

// Function to determine circle size based on population
function getCircleSize(population) {
    return Math.sqrt(population) * 100; // Adjust multiplier as needed for visibility
}

// Add city circles to the map
cities.forEach(city => {
    L.circle([city.lat, city.lon], {
        color: 'blue',
        fillColor: '#30f',
        fillOpacity: 0.5,
        radius: getCircleSize(city.population)
    }).bindPopup(`<strong>${city.name}</strong><br>Population: ${city.population.toLocaleString()}`)
      .addTo(map);
});

// Sort cities by population in descending order
cities.sort((a, b) => b.population - a.population);

// Create a legend for the top 10 largest cities
var legend = document.getElementById('legend');
legend.innerHTML = '<h3>Top 10 Largest Cities</h3>';

cities.slice(0, 10).forEach(city => {
    var item = document.createElement('div');
    item.className = 'legend-item';
    item.innerHTML = `<span>${city.name}</span><span>${city.population.toLocaleString()}</span>`;
    legend.appendChild(item);
});
