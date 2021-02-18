var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson"

d3.json(queryUrl, function(data){
   createFeatures(data.features);
})

function createFeatures(earthquakeData) {
    // Function to bind a popup to each feature in the features array
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }

    // Create GeoJSON layer containing the features array
    // Run the function once for each piece of data in the array
    var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature
    });

    // Pass earthquake layer to map creation function
    createMap(earthquakes);
}
