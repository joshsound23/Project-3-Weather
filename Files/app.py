# Import the dependencies.
from sys import _enablelegacywindowsfsencoding
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import datetime as dt
from flask import Flask, jsonify
from statistics import mean


#################################################
# Database Setup
#################################################

engine = create_engine("sqlite:///Resources/hawaii.sqlite")

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(autoload_with=engine)

# Save references to each table
station = Base.classes.station
measurement = Base.classes.measurement
print(station)
# Create our session (link) from Python to the DB
session = Session(engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)



#################################################
# Flask Routes
#################################################

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
@app.route("/api/v1.0/precipitation")
def precipitation():
    session = Session(engine)

    results = session.query(measurement.station, measurement.date, measurement.prcp, measurement.tobs).all()
    start_date = session.query(measurement.date).order_by(measurement.date.desc()).first()

    start_object = dt.datetime.strptime(start_date.date, "%Y-%m-%d")
    end_object = start_object - dt.timedelta(days=365)

    final_results = session.query(measurement.date, measurement.prcp).\
        filter(measurement.date > end_object).all()

    session.close()

    all_results = []
    for date, prcp in final_results:
        results_dict = {}
        results_dict["date"] = date
        results_dict["prcp"] = prcp
        all_results.append(results_dict)
    return jsonify(all_results)


@app.route("/api/v1.0/stations")
def stations():
    session = Session(engine)

    station_results = session.query(station.station).all()

    session.close()

    station_list = []
    for i in station_results:
        station_list.append(i[0])
    return jsonify(station_list)
        
@app.route("/api/v1.0/tobs")
def tobs():
    session = Session(engine)

    results = session.query(measurement.station, measurement.date, measurement.prcp, measurement.tobs).all()
    start_date = session.query(measurement.date).order_by(measurement.date.desc()).first()

    start_object = dt.datetime.strptime(start_date.date, "%Y-%m-%d")
    end_object = start_object - dt.timedelta(days=365)

    station = session.query(measurement.station, func.count().label('station_count')).group_by(measurement.station).order_by(func.count().desc()).first()

    final_results = session.query(measurement.date, measurement.tobs).\
        filter(measurement.date > end_object).filter(measurement.station == station[0])

    session.close()

    tobs_results = []
    for date, tobs in final_results:
        results_dict = {}
        results_dict["date"] = date
        results_dict['tobs'] = tobs
        tobs_results.append(results_dict)

    return jsonify(tobs_results)

@app.route("/api/v1.0/<start>")
def temp_start(start):
    session = Session(engine)

    start_filter = session.query(measurement.tobs).filter(measurement.date>= start).all()
    start_filter_results = [result[0] for result in start_filter]
    
    min_temp = min(start_filter_results)
    max_temp = max(start_filter_results)
    avg_temp = mean(start_filter_results)
    avg_temp = round(avg_temp, 1)
    
    start_final = [{"Min": min_temp, "Max": max_temp, "Mean": avg_temp}]
    return jsonify(start_final)

@app.route("/api/v1.0/<start>/<end>")
def temp_end(start, end):
    session = Session(engine)

    start_filter = session.query(measurement.tobs).filter(measurement.date>= start).filter(measurement.date<= end).all()
    start_filter_results = [result[0] for result in start_filter]
    
    min_temp = min(start_filter_results)
    max_temp = max(start_filter_results)
    avg_temp = mean(start_filter_results)
    avg_temp = round(avg_temp, 1)

    start_final = [{"Min": min_temp, "Max": max_temp, "Mean": avg_temp}]
    return jsonify(start_final)

if __name__ == '__main__':
    app.run(debug=True)
