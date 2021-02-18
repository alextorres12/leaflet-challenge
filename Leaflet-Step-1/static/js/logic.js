var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson"

d3.json(queryUrl, function(data){
   console.log(data.features);
})

function createFeatures(earthquakedata) {
    
}
