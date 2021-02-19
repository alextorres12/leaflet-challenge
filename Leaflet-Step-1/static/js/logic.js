var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson"


// Get request to queryUrl
d3.json(queryUrl, function(data){
   createFeatures(data.features);
});

function createFeatures(earthquakeData) {
    

    // Function to bind a popup to each feature in the features array
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p><p>Magnitude: " + feature.properties.mag + "</p>");
    }

    // L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
    //     fillOpacity: 0.75,
    //     color: "white",
    //     fillColor: "purple",
    //     radius: feature.properties.mag
    // }); 

    function getColor(depth){
        return depth > 500 ? '#800026' :
            depth > 300  ? '#BD0026' :
            depth > 200  ? '#E31A1C' :
            depth > 100  ? '#FC4E2A' :
            depth > 50   ? '#FD8D3C' :
            depth > 20   ? '#FEB24C' :
            depth > 10   ? '#FED976' :
                            '#FFEDA0';

    }

    // Create GeoJSON layer containing the features array
    // Run the function once for each piece of data in the array
    var earthquakes = L.geoJSON(earthquakeData, {
        pointToLayer: function (feature, latlng){
            return new L.CircleMarker(latlng, {
                fillOpacity: 0.85,
                color: getColor(feature.geometry.coordinates[2]),
                radius: feature.properties.mag*4
            })
        },
        onEachFeature: onEachFeature
    });

    // Pass earthquake layer to map creation function
    createMap(earthquakes, earthquakeData);
}

function createMap(earthquakes, earthquakeData){
    
    // Define streetmap layer
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
    });

    // Define darkmap layer
    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "dark-v10",
        accessToken: API_KEY
    });

    // Define baseMaps object to hold base layers
    var baseMaps = {
        "Street Map": streetmap,
        "Dark Map": darkmap
    };

    // Create overlay object to hold overlay layer
    var overlayMaps = {
        Earthquakes: earthquakes
    };

    // Create map with streetmap and earthquakes to display on load
    var myMap = L.map("mapid", {
        center: [9.304964883671476, -79.42759905850454],
        zoom: 5,
        layers: [streetmap, earthquakes]
    });

    /*
    * Create layer control,
    * pass in baseMaps and overlayMaps,
    * add layer control to the map
    */
   L.control.layers(baseMaps, overlayMaps, {
       collapsed: false
   }).addTo(myMap);

   console.log(earthquakeData[0].geometry.coordinates[1]);

}