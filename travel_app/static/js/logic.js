
// Load Json based on API route
// fetch('https://server.com/test.json')
//     .then((response) => response.json())
//     .then((json) => console.log(json));

    // fetch('../prework_folder/test.json')
    // .then((response) => response.json())
    // .then((json) => console.log(json));

    let city_data = '../prework_folder/test.json';
    
    d3.json(city_data).then(function(data) {
      console.log(data);

    });

  
// Create Map Object
let myMap = L.map("map", {
    center: [45.52, -122.67],
    zoom: 3
  });
  
  // Adding a tile layer (the background map image) to our map:
  // We use the addTo() method to add objects to our map.
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

// Add popup Markers

// Select marker function to update charts

// Create 3 charts - Temp, Precip, Wind

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

FusionCharts.ready(function() {
  var fuelVolume = 110,
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
