console.log()
// Create Map Object
let myMap = L.map("map", {
    center: [51.4999947297, -0.11672184386],
    zoom: 12
  });
  
  // Adding a tile layer (the background map image) to our map:
  // We use the addTo() method to add objects to our map.
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
 
  let weather_data = '../prework_folder/test.json';
  let city_data = '../prework_folder/cities_data.json';

  // use D3 to grab json data.
    // Fetch the JSON data using D3.js
    d3.json(city_data)
        .then(data => {
          console.log(data)
          data.forEach(location => {
            
            let lat = 51.4999947297;
            let lng = -0.11672184386;
            let date = 1514764800000;
            let precip = location.precipitation_mm;
            // console.log(precip)
            
            let marker = L.marker([lat, lng,]).addTo(myMap);
            marker.bindPopup(precip);
  
          });

            // Your code to handle each location (if needed)
        })
    .catch(error => {
        console.error('Error fetching/parsing JSON:', error);
    });
    // Logic to render visualization with the data

// Select marker function to update charts

// Create 3 charts - Temp [stephanie], Precip[matt], Wind[ben]