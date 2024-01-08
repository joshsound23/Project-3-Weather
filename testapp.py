from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson import json_util
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('indextwo.html')

# Connect to your MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['project3_weather']  # Replace 'your_database_name' with your database name
collection = db['merged_data']  # Replace 'your_collection_name' with your collection name

def get_random_cities(query, city_limit):
    pipeline = [
        {'$match': query},
        {'$sample': {'size': city_limit}},
        {'$unset': '_id'}
    ]
    result = list(collection.aggregate(pipeline))
    return jsonify(result)

@app.route('/us-cities', methods=['GET'])
def us_cities():
    try:
    # Retrieve user inputs for temperature and season
        # temperature = request.args.get('temperature')
        max_temp = request.args.get('max_temp')
        # print(request.args.get('min_temp'))
        min_temp = request.args.get('min_temp')
        season = request.args.get('season')
        city_limit = 10

    # Prepare the query for U.S. cities based on user inputs 
        query = {
        'country': 'United States of America'
        }

    # Add optional filters based on user input for temperature and season
        # if temperature:
        if max_temp and min_temp:
            # query['avg_temp_c'] = float(temperature)
            query['avg_temp_c'] = {
                '$lte': float (max_temp),
                '$gte': float (min_temp)
            }
        if season:
            query['season'] = season
        data = get_random_cities(query, city_limit)
        print(data.json)
        return data
    except Exception as e:
        app.logger.error(f"An error occurred: {str(e)}")
        return jsonify({'error': f'An internal server error occurred: {str(e)}'}), 500
    # Perform MongoDB query for U.S. cities, excluding the _id field
    #cursor = collection.find(query, {'_id': 0})

    # Convert MongoDB cursor to a JSON-serializable list of dictionaries using bson.json_util
    #us_cities_filtered = json_util.dumps(list(cursor))

    #return us_cities_filtered

@app.route('/international-cities', methods=['GET'])
def international_cities():
    # Retrieve user inputs for temperature and season
    max_temp = request.args.get('max_temp')
        # print(request.args.get('min_temp'))
    min_temp = request.args.get('min_temp')
    season = request.args.get('season')
    city_limit = 10

# Prepare the query for international cities based on user inputs
    query = {
    'country': {'$ne': 'United States of America'}
}

# Add optional filters based on user input for temperature and season
    if max_temp and min_temp:
        # query['avg_temp_c'] = float(temperature)
        query['avg_temp_c'] = {
            '$lte': float (max_temp),
            '$gte': float (min_temp)
        }
    if season:
        query['season'] = season
    return get_random_cities(query, city_limit)

    # Perform MongoDB query for international cities, excluding the _id field
    #cursor = collection.find(query, {'_id': 0})

    # Convert MongoDB cursor to a JSON-serializable list of dictionaries using bson.json_util
    #international_cities_filtered = json_util.dumps(list(cursor))

    #return international_cities_filtered

# @app.route('/dashboard')
# def dashboard():
#     return render_template('dashboard.html')

if __name__ == '__main__':
    app.run(debug=True)




