import numpy as np
import json

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template
from bson import json_util

#################################################
# Database Setup
#################################################
from pymongo import MongoClient

# Initialize MongoDB connection
mongo = MongoClient(port=27017)  # Replace with your MongoDB connection URL
db = mongo['project3_weather']  # Replace 'your_database_name' with your database name
collection = db.merged_data

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    return render_template("index.html")

@app.route("/alldata")
def alldata():
    results = list(collection.find().limit(10))
    return json.dumps(results, default=json_util.default)

if __name__ == '__main__':
    app.run(debug=True)
    