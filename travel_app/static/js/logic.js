// Find the average wind data by day per city
const wind = [];
for (let i = 0; i < filtered.length; i++) {
  let wind_record = filtered[i];
  wind.push(wind_record.avg_wind_speed_kmh);
}
console.log(wind);

var total_wind = 0;

for (var i = 0; i < wind.length; i++) {
  total_wind += wind[i];
}

avg_wind = total_wind / wind.length;

console.log(avg_wind);

// Find the average sunshine data by day per city
const sun = [];
for (let i = 0; i < filtered.length; i++) {
  let sun_record = filtered[i];
  sun.push(sun_record.sunshine_total_min);
}
console.log(sun);

var total_sun = 0;

var total_sun = 0;
for (let i = 0; i < sun.length; i++) {
  total_sun += sun[i];
}

avg_sun = total_sun / sun.length;

console.log(avg_sun);

// Create wind chart
FusionCharts.ready(function() {
  var myChart = new FusionCharts({
    type: "hlineargauge",
    renderAt: "wind",
    id: "cityWind",
    width: "240",
    height: "300",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Avg. Wind Speed",
        subcaption: "",
        theme: "gammel",
        showvalue: "0",
        pointerbghovercolor: "#ffffff",
        pointerbghoveralpha: "80",
        pointerhoverradius: "12",
        showborderonhover: "1",
        pointerborderhovercolor: "#333333",
        pointerborderhoverthickness: "2",
        showtickmarks: "0",
        numbersuffix: "kmh"
      },
      colorrange: {
        color: [
          {
            minvalue: "0",
            maxvalue: "20",
            label: "Calm",
            code: "#32e3e3"
          },
          {
            minvalue: "20",
            maxvalue: "40",
            label: "Breezy",
            code: "#f9f9f9"
          },
          {
            minvalue: "40",
            maxvalue: "100",
            label: "Windy",
            code: "#888e8e"
          }
        ]
      },
      pointers: {
        pointer: [
          {
            value: avg_wind,
            tooltext: "$datavalue kilometers per hour of wind"
          }
        ]
      }
    };
    "events" :{
      "rendered" : function (evnt, argt) {
          var chargeInterval = setInterval( function(){
              var wind = avg_wind;
              FusionCharts.items["cityWind"].feedData("&value="+wind);
          }, 4);
      }  
  }
  }).render();
});


// Create sunshine chart
FusionCharts.ready(function() {
  var myChart = new FusionCharts({
    type: "hlineargauge",
    renderAt: "sunshine",
    id: "citySun",
    width: "240",
    height: "300",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Avg. Daily Minutes of Sunshine",
        subcaption: "",
        theme: "gammel",
        showvalue: "0",
        pointerbghovercolor: "#ffffff",
        pointerbghoveralpha: "80",
        pointerhoverradius: "12",
        showborderonhover: "1",
        pointerborderhovercolor: "#333333",
        pointerborderhoverthickness: "2",
        showtickmarks: "0",
        numbersuffix: "min"
      },
      colorrange: {
        color: [
          {
            minvalue: "0",
            maxvalue: "480",
            label: "Little Sunlight",
            code: "#b9b9b3"
          },
          {
            minvalue: "480",
            maxvalue: "960",
            label: "Moderate Sunlight",
            code: "#fdfdfa"
          },
          {
            minvalue: "960",
            maxvalue: "1440",
            label: "Lots of Sunlight",
            code: "#ffff00"
          }
        ]
      },
      pointers: {
        pointer: [
          {
            value: avg_sun,
            tooltext: "$datavalue minutes of sunlight"
          }
        ]
      }
    };
    "events" :{
      "rendered" : function (evnt, argt) {
          var chargeInterval = setInterval( function(){
              var sun = avg_sun;
              FusionCharts.items["citySun"].feedData("&value="+sun);
          }, 4);
      }  
  }
  }).render();
});
