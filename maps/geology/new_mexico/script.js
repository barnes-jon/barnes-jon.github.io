// Initialize the map and set its view to Southwest New Mexico
var map = L.map('map').setView([34.5, -106.5], 8);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Load the GeoJSON data for mountain peaks
fetch('black_range_peaks.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, {
                    icon: L.icon({
                        iconUrl: 'mountain_icon.jpg',
                        iconSize: [32, 32]
                    })
                });
            }
        }).addTo(map);
    });

// Load the GeoJSON data for the mountain range extent
fetch('black_range_extent_v2.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: {
                color: 'red',
                weight: 3,
                dashArray: '5, 5',
                fillOpacity: 0
            }
        }).addTo(map);
    });
