# API Routes - Nathan & Josh
######

 




#####
# Global (no filter)Date/Temp
# US Date/Temp
# Country Date/Temp

from flask import Flask
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient("mongodb://localhost:27017/")
db = client.Learning
todos = db.data


@app.route('/')
def lists():
    result = []
    for x in todos.find():
        result.append(x)
    return jsonify(result)


@app.route('/global_date_temp')
def global_date_temp():
    global_data = todos.find_one({"type": "global"})
    if global_data:
        response_data = {
            "type": global_data.get("type"),
            "date": global_data.get("date"),
            "temperature": global_data.get("temperature")
        }
        return jsonify(response_data)


@app.route('/us_date_temp')
def us_date_temp():
    us_data = todos.find_one({"type": "US"})
    if us_data:
        response_data = {
            "type": us_data.get("type"),
            "date": us_data.get("date"),
            "temperature": us_data.get("temperature")
        }
        return jsonify(response_data)

@app.route('/country_date_temp')
def country_date_temp():
    country_data = todos.find_one({"type": "country"})
    if country_data:
        response_data = {
            "type": country_data.get("type"),
            "date": country_data.get("date"),
            "temperature": country_data.get("temperature")
        }
        return jsonify(response_data)


if __name__ == '__main__':
    app.run(debug=True)