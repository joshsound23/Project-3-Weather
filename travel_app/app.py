# API Routes - Nathan & Josh

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
    for x in todos.find():
        y = print(x)
    return ""


if __name__ == '__main__':
    app.run()