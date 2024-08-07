// Initialize the map
var map = L.map('map').setView([32.0, -107.0], 7);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Function to generate a random color
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Object to store colors for each MapUnit
var mapUnitColors = {};

// Function to get color based on MapUnit
function getColor(mapUnit) {
    if (!mapUnitColors[mapUnit]) {
        mapUnitColors[mapUnit] = getRandomColor();
    }
    return mapUnitColors[mapUnit];
}

// Define a function to style each feature
function style(feature) {
    return {
        fillColor: getColor(feature.properties.MapUnit),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

// Load GeoJSON data
fetch('sw_nm_geology.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJson(data, { style: style }).addTo(map);
    });
