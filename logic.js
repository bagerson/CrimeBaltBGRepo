// Creating map object
var map = L.map("map", {
  center: [39.2904, -76.6122],
  zoom: 11
});

// Adding tile layer //THIS IS THE BASELAYER
var baselayer = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);


//Baltimore API endpoint
var link = "https://data.baltimorecity.gov/resource/h32e-c3r6.json"
var shootings = "./crime_JSON/CR_Property.json"

// Grabbing json data
d3.json(link, function(data) { //pass the full JSON link

  

  data.forEach(function(element){  //filter for lat and long with foreach loop
    console.log("camera" + element.latitude);
    console.log(element.longitude);
    lat =element.latitude;
    lon =element.longitude;  //NOTE: lat/long not stored in global variable.
    

    var marker = L.marker([lat, lon], { //pass lat/long to marker
      draggable: true,
      title: "My First Marker"
    }).addTo(map);

    
  });
});

// Grabbing json data
d3.json(shootings, function(data) { //pass the full JSON link
  
var heatArray = [];
    data.forEach(function(element){  //filter for lat and long with foreach loop
      console.log(element.Latitude);
      console.log(element.Longitude);
      lat =element.Latitude;
      lon =element.Longitude;  //NOTE: lat/long not stored in global variable.
      heatArray.push([lat, lon]);

    var heat = L.heatLayer(heatArray, {
      radius: 20,
      blur: 35
    }).addTo(map);

    });
});

//Add Layers

// Add all the cityMarkers to a new layer group.
// Now we can handle them as one group instead of referencing each individually
var cityLayer = L.layerGroup(cityMarkers);




// Only one base layer can be shown at a time
var baseMaps = {
  Light: light,
  Dark: dark
};

// Overlays that may be toggled on or off
var overlayMaps = {
  Cities: cityLayer
};

// Create map object and set default layers
var myMap = L.map("map", {
  center: [46.2276, 2.2137],
  zoom: 6,
  layers: [light, cityLayer]
});

// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps).addTo(myMap);
