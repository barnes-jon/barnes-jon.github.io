// Initialize the map
var map = L.map('map').setView([34.5, -106], 7);

// Set up the OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);

// Function to determine circle size based on population
function getCircleSize(population) {
    return Math.sqrt(population) * 0.08; // Adjust multiplier as needed
}

// Add city circles to the map
cities.forEach(city => {
    var circle = L.circle([city.lat, city.lon], {
        color: 'blue',
        fillColor: '#30f',
        fillOpacity: 0.5,
        radius: getCircleSize(city.population)
    }).addTo(map);
    
    circle.bindPopup(`<strong>${city.name}</strong><br>Population: ${city.population.toLocaleString()}`);
});

// Create a legend for the top 10 largest cities
var legend = document.getElementById('legend');
legend.innerHTML = '<h3>Top 10 Largest Cities</h3>';

cities.slice(0, 10).forEach(city => {
    var item = document.createElement('div');
    item.className = 'legend-item';
    item.innerHTML = `<span>${city.name}</span><span>${city.population.toLocaleString()}</span>`;
    legend.appendChild(item);
});
