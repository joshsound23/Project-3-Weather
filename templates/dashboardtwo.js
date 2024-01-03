// Load Json based on API route
 
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
  let city_data = [
    {
      "_id": {
        "$oid": "6582615df6a914f1bc5b2552"
      },
      "": 20116,
      "station_id": 3772,
      "city_name": "London",
      "longitude": -0.116721844,
      "latitude": 51.49999473,
      "date": "2018-01-01",
      "season": "Winter",
      "avg_temp_c": 6.7,
      "precipitation_mm": 5.1,
      "snow_depth_mm": "",
      "avg_wind_speed_kmh": 20.7,
      "sunshine_total_min": ""
    },
    {
      "_id": {
        "$oid": "6582615df6a914f1bc5b2553"
      },
      "": 20120,
      "station_id": 3772,
      "city_name": "London",
      "longitude": -0.116721844,
      "latitude": 51.49999473,
      "date": "2018-01-05",
      "season": "Winter",
      "avg_temp_c": 6.2,
      "precipitation_mm": 5.8,
      "snow_depth_mm": "",
      "avg_wind_speed_kmh": 17.2,
      "sunshine_total_min": ""
    },
    {
      "_id": {
        "$oid": "6582615df6a914f1bc5b2554"
      },
      "": 20121,
      "station_id": 3772,
      "city_name": "New York",
      "longitude": -73.935242,
      "latitude": 40.730610,
      "date": "2018-01-06",
      "season": "Winter",
      "avg_temp_c": 3.4,
      "precipitation_mm": 0.3,
      "snow_depth_mm": "",
      "avg_wind_speed_kmh": 11.6,
      "sunshine_total_min": ""
    }];
   
  d3.json(city_data).then(function(data) {
    console.log(data);
   
  });


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
avg_temp = total / temps.length;


console.log(avg_temp);




// Create list of precipitation in that city for the time frame
const precips = [];
for (let i = 0; i < filtered.length; i++) {
  let precip_record = filtered[i];
  precips.push(precip_record.precipitation_mm);


}
console.log(precips);


// Average list of precipitation to get an average precipitation for time frame
var total_precip = 0;
for(var i = 0; i < precips.length; i++) {
total_precip += precips[i];
}
avg_precip = total_precip / precips.length;


console.log(avg_precip);




}


var avg_temp = 10
var avg_precip = 15


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
          "value": avg_temp,
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
                  var temp = avg_temp;
                  FusionCharts.items["cityTemp"].feedData("&value="+temp);
              }, 4);
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
          "upperLimit": "50",
          "lowerLimitDisplay": "Empty",
          "upperLimitDisplay": "Full",
          "numberSuffix": " millimeters",
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
                "text": avg_precip,
                "x": "$chartCenterX-45",
                "y": "$chartEndY-50"
              }
            ]
          }]
        }


      },
      "events": {
        "rendered": function(evtObj, argObj) {
          var chargeInterval = setInterval( function(){
              var p_value = avg_precip;
              FusionCharts.items["cityPrecip"].feedData("&value="+p_value);
          }, 4);
        },
       
      }
    }).render();
});


