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
    d3.json(city_data)
    .then(data => {
        console.log(data);
        let uniqueLocations = {};

        data.forEach(location => {
            console.log('Processing location:', location);
            let lat = 51.4999947297;
            let lng = -0.11672184386;
            let datemilsec = location.date.$date;
            let date = new Date(datemilsec).toISOString().split('T')[0];
            let precipitation = parseFloat(location.precipitation_mm);
            console.log(precipitation);

            // Fix: Use location.city_name instead of cityName
            let cityName = location.city_name;

            if (!isNaN(lat) && !isNaN(lng)) {
                const cityName = location.city_name;

                if (!uniqueLocations[cityName]) {
                    // Add the location to uniqueLocations with the first date
                    uniqueLocations[cityName] = {
                        lat: parseFloat(location.lat), // Replace with the actual property name
                        lng: parseFloat(location.lng), // Replace with the actual property name
                        date: date,
                        precipitation: precipitation
                    };
                    console.log('Latitude:', lat, 'Longitude:', lng);
                    // Create a marker at the location and bind a popup
                    const marker = L.marker([uniqueLocations[cityName].lat, uniqueLocations[cityName].lng]).addTo(myMap);
                    marker.bindPopup(`City: ${cityName}<br>Date: ${date}<br>Precipitation: ${precipitation}`);
                }
                // Your code to handle each location (if needed)
            }
        });

        // Once you have uniqueLocations populated, you can use it to create charts or other visualizations
        console.log(uniqueLocations);
    })
    .catch(error => {
        console.error('Error fetching/parsing JSON:', error);
    });
// Create 3 charts - Temp [stephanie], Precip[matt], Wind[ben]