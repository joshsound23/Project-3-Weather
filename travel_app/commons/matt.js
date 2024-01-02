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
  let city_data = '../prework_folder/cities_data.json'
  
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