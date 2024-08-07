// Initialize the map
var map = L.map('map').setView([32.0, -107.0], 7);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Define a function to get color based on MapUnit
function getColor(mapUnit) {
    switch (mapUnit) {
        case 'Unit1': return '#ff0000';
        case 'Unit2': return '#00ff00';
        case 'Unit3': return '#0000ff';
        // Add more cases as needed
        default: return '#ffffff';
    }
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
