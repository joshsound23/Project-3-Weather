// Capture data
const database = client.db('Project3_Weather').collection('weather_data');

// Find documents in the collection
collection.find({}).toArray((err, documents) => {
    if (err) {
      console.error('Error fetching documents:', err);
      return;
    }
  
    // Process the retrieved documents
    console.log('Retrieved documents:', documents);
  
    // Close the connection after finishing operations
    client.close();
});

// Get city, date, wind, and sunshine data

// Find the average wind data by day per city

// Find the average sunshine data by day per city

// Create wind chart

// Create sunshine chart