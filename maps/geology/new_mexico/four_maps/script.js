// Map 1 - Watersheds
var map1 = L.map('map1').setView([33.18452, -107.84115], 10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map1);
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
        }).addTo(map1);
    });

// Map 2 - Habitat
var map2 = L.map('map2').setView([33.18452, -107.84115], 10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map2);
fetch('habitat.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: function (feature) {
                return {
                    fillColor: getRandomColor(),
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    dashArray: '3',
                    fillOpacity: 0.7
                };
            },
            onEachFeature: function(feature, layer) {
                layer.bindPopup(feature.properties.US_L4NAME);
            }
        }).addTo(map2);
    });

// Map 3 - Soil Type
var map3 = L.map('map3').setView([32.914, -107.587], 10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map3);
fetch('soil_type.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: function (feature) {
                return {
                    fillColor: getRandomColor(),
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    fillOpacity: 0.7
                };
            }
        }).addTo(map3);
    });

// Map 4 - Geologic Rock Type
var map4 = L.map('map4').setView([32.0, -107.0], 7);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map4);
fetch('sw_nm_geology.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJson(data, {
            style: function (feature) {
                return {
                    fillColor: getColor(feature.properties.MapUnit),
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    dashArray: '3',
                    fillOpacity: 0.7
                };
            },
            onEachFeature: function(feature, layer) {
                if (feature.properties && feature.properties.MapUnit) {
                    layer.on('click', function () {
                        layer.bindPopup('MapUnit: ' + feature.properties.MapUnit).openPopup();
                    });
                }
            }
        }).addTo(map4);
    });

// Function to generate a random color
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Function to get color based on MapUnit
function getColor(mapUnit) {
    if (!mapUnitColors[mapUnit]) {
        mapUnitColors[mapUnit] = getRandomColor();
    }
    return mapUnitColors[mapUnit];
}

// Object to store colors for each MapUnit
var mapUnitColors = {};
