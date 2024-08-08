// Create the map and set the initial view to a coordinate in SW New Mexico
var map = L.map('map').setView([32.914, -107.587], 10);

// Add the OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Function to generate random colors
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Create an object to store colors for each MUKEY value
var mukeyColors = {};

// Function to style each feature
function styleFeature(feature) {
    var mukey = feature.properties.MUKEY;
    if (!mukeyColors[mukey]) {
        mukeyColors[mukey] = getRandomColor();
    }
    return {
        fillColor: mukeyColors[mukey],
        weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
    };
}

// Function to handle clicks on the map using bindPopup
function onEachFeature(feature, layer) {
    var mukey = feature.properties.MUKEY;
    layer.bindPopup("MUKEY: " + mukey);
}

// Load the GeoJSON file and add it to the map
fetch('hillsboro_kingston_soil_map_large.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: styleFeature,
            onEachFeature: onEachFeature
        }).addTo(map);
    });
