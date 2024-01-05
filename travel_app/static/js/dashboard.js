
// Load Json based on API route


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
  // Wind - Ben
  // Sunshine - Ben
  // Precip - Matt
  // Temp - Stephanie