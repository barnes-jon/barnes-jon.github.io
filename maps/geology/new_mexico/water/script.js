// Initialize the map
var map = L.map('map').setView([33.18452, -107.84115], 10); // Centered on Black Range

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Load GeoJSON data
fetch('black_range_watershed.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: function (feature) {
                return {
                    color: 'blue',
                    weight: 2,
                    fillOpacity: 0
                };
            }
        }).addTo(map);
    });
