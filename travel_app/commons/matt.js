console.log()

  
// Create Map Object
let myMap = L.map("map", {
    center: [45.52, -122.67],
    zoom: 3
  });
  
  // Adding a tile layer (the background map image) to our map:
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

// Setting a static JSON for testing
  

// Add popup Markers
for (let i = 0; i < city_data.length; i++) {
  let city = city_data[i];
  L.marker([city.latitude, city.longitude])
    .bindPopup(`${city.city_name}`)
    .addTo(myMap).on('click', onClick);
}

// Select marker function to update charts

// Click and log the city name
function onClick(e) {
  var popup = e.target.getPopup();
  var content = popup.getContent();

  console.log(content);

  // Filter JSON by city clicked on
  filtered = city_data.filter(function (i) {
    return i.city_name === content;
  });
    console.log(filtered);

    // Create list of temperatures in that city for the time frame
    const temps = [];
    for (let i = 0; i < filtered.length; i++) {
      let temp_record = filtered[i];
      temps.push(temp_record.avg_temp_c);

    }
    console.log(temps);

    // Average list of temperatures to get an average temperature for time frame
    var total = 0;
for(var i = 0; i < temps.length; i++) {
    total += temps[i];
}
var avg_temp = total / temps.length;

console.log(avg_temp);

}
  

// Create 3 charts - Temp, Precip, Wind

// Temperature Chart https://jsfiddle.net/fusioncharts/ND2WL/
FusionCharts.ready(function () {
  var chart = new FusionCharts({
      type: 'thermometer',
      renderAt: 'temp',
      id  : 'cityTemp',
      width: '240',
      height: '300',
      dataFormat: 'json',
      dataSource: {
          "chart": {
              "caption": "Avg. Temperature",
              "subcaption": " City Name",
              "lowerLimit": "-20",
              "upperLimit": "20",
              "numberSuffix": "°C",
              "showhovereffect": "1",
              "thmFillColor": "#008ee4",
              "showGaugeBorder" : "1",
              "gaugeBorderColor" :  "#008ee4",
              "gaugeBorderThickness" :  "2",
              "gaugeBorderAlpha" :  "30",
              "thmOriginX": "100",
              "theme" : "fint"
          },
          "value": "-6",
          //All annotations are grouped under this element
          "annotations": {
              "showbelow": "0",
              "groups": [                        
                  {                  
                      //Each group needs a unique ID
                      "id": "indicator",
                      "items": [
                          //Showing Annotation
                          {
                              "id": "background",
                              //Polygon item 
                              "type": "rectangle",
                              "alpha" : "50",
                              "fillColor": "#AABBCC",           
                              "x" : "$gaugeEndX-35",
                               "tox" : "$gaugeEndX",
                              "y" : "$gaugeEndY+55",
                              "toy" : "$gaugeEndY+72"
                          }
                      ]
                  }
              ]
              
          },
      },
      "events" :{
          "rendered" : function (evt, arg) {
              var chargeInterval = setInterval( function(){
                  var temp = parseInt(Math.random()*2) -5;
                  FusionCharts.items["cityTemp"].feedData("&value="+temp);
              }, 4000);
          }   
      }
  })
  .render();
});

// Rainfall Chart https://jsfiddle.net/fusioncharts/MWnVr/
FusionCharts.ready(function() {
  var rainVolume = 110,
    fuelWidget = new FusionCharts({
      type: 'cylinder',
      dataFormat: 'json',
      id: 'cityPrecip',
      renderAt: 'precip',
      width: '240',
      height: '300',
      dataSource: {
        "chart": {
          "theme": "fusion",
          "caption": "Avg. Precipitation",
          "subcaption": "Rain",
          "lowerLimit": "0",
          "upperLimit": "120",
          "lowerLimitDisplay": "Empty",
          "upperLimitDisplay": "Full",
          "numberSuffix": " inches",
          "showValue": "1",
          "chartBottomMargin": "45",
          "showValue": "0"
        },
        "value": "75",
        "annotations": {
          "origw": "400",
          "origh": "190",
          "autoscale": "1",
          "groups": [{
            "id": "range",
            "items": [{
                "id": "rangeBg",
                "type": "rectangle",
                "x": "$canvasCenterX-45",
                "y": "$chartEndY-30",
                "tox": "$canvasCenterX +45",
                "toy": "$chartEndY-75",
                "fillcolor": "#6caa03"
              },
              {
                "id": "rangeText",
                "type": "Text",
                "fontSize": "11",
                "fillcolor": "#333333",
                "text": "80 ltrs",
                "x": "$chartCenterX-45",
                "y": "$chartEndY-50"
              }
            ]
          }]
        }

      },
      "events": {
        "rendered": function(evtObj, argObj) {
          setInterval(function() {
            (rainVolume < 10) ? (rainVolume = 80) : "";
            var consVolume = rainVolume - (Math.floor(Math.random() * 3));
            
          }, 1000);
        },
        
      }
    }).render();
});
  // use D3 to grab json data.
    // Fetch the JSON data using D3.js
    d3.json(merged_data)
    .then(data => {
        console.log(data);
        let uniqueLocations = {};
    
        data.forEach(location => {
            console.log('Processing location:', location);
            let lat = parseFloat(location.latitude);
            let lng = parseFloat(location.longitude);
            let date = location.date; // Directly using the date from JSON
            let precipitation = location.precipitation_mm; // Using the precipitation directly
    
            // Assuming precipitation might be empty, parse it to float if it's not empty
            if (precipitation !== "") {
                precipitation = parseFloat(precipitation);
            }
    
            let cityName = location.city_name;
    
            if (!isNaN(lat) && !isNaN(lng)) {
                if (!uniqueLocations[cityName]) {
                    uniqueLocations[cityName] = {
                        lat: lat,
                        lng: lng,
                        date: date,
                        precipitation: precipitation
                    };
                    console.log('Latitude:', lat, 'Longitude:', lng);
                    // Create a marker at the location and bind a popup
                    const marker = L.marker([lat, lng]).addTo(myMap);
                    marker.bindPopup(`City: ${cityName}<br>Date: ${date}<br>Precipitation: ${precipitation}`);
                }
            }
        });

        // Once you have uniqueLocations populated, you can use it to create charts or other visualizations
        console.log(uniqueLocations);
    })
    .catch(error => {
        console.error('Error fetching/parsing JSON:', error);
    });
// Create 3 charts - Temp [stephanie], Precip[matt], Wind[ben]