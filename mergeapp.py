from pymongo import MongoClient

# Initialize MongoDB connection
mongo = MongoClient(port=27017)  # Replace with your MongoDB connection URL
db = mongo['Project3_Weather']  # Replace 'your_database_name' with your database name

# Merge data using aggregation pipeline
pipeline = [
    {
        '$lookup': {
            'from': 'cities',  # Name of the other collection (cities collection)
            'localField': 'station_id',  # Field from weather_data collection
            'foreignField': 'station_id',  # Field from cities collection
            'as': 'city_data'  # Alias for the merged data
        }
    },
    {
        '$unwind': '$city_data'  # Unwind the resulting array
    },
    {
        '$project': {
            '_id': 0,  # Exclude _id field from weather_data
            'station_id': 1,
            'city_name': 1,
            'date': 1,
            'season': 1,
            'avg_temp_c': 1,
            'precipitation_mm': 1,
            'snow_depth_mm': 1,
            'avg_wind_speed_kmh': 1,
            'sunshine_total_min': 1,
            'country': '$city_data.country',  # Merge country field
            'state': '$city_data.state',  # Merge state field
            'latitude': '$city_data.latitude',  # Merge latitude field
            'longitude': '$city_data.longitude'  # Merge longitude field
        }
    }
]

# Merge the data using aggregation pipeline and update weather_data collection
result = db.weather_data.aggregate(pipeline)

# You might want to insert this result into a new collection or update existing documents
# For example, you can insert the merged data into a new collection:
db.merged_data.insert_many(result)



##########  New Setup ########## Project
from flask import Flask, jsonify
from pymongo import MongoClient

app = Flask(__name__)

# Initialize MongoDB connection
client = MongoClient('mongodb://localhost:27017/')  # Replace with your MongoDB connection URL
db = client['project3_weather']  # Replace 'your_database_name' with your database name
collection = db['merged_data']  # Replace 'your_collection_name' with your collection name


@app.route('/')
def get_data():
    data = list(collection.find({}))  # Retrieve all data from MongoDB
    return jsonify({'data': data})


if __name__ == '__main__':
    app.run(debug=True)

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/precipitation<br/>"
        f"/api/v1.0/stations<br/>"
        f"/api/v1.0/tobs<br/>"
        f"/api/v1.0/<start><br/>"
        f"/api/v1.0/<start>/<end><br/>"
    )