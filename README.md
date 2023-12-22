# Project-3-Weather

Collaborators:

Josh Soundarajan
Nathan Kaspar
Ben Belczak
Matthew Hill
Stephanie Carlson

______________________________________________________________

Project Outline:

Create an interactive map that allows you to plan a multicity trip based on input criteria


Create map with openweathermaps
User selects a dashboard through Flask API
-Total US
-Region
-International

User Input:
Dates
Temperature range or other details
Number of cities

______________________________________________________________

Dashboard may include:
-Map with markers (selected cities)
-City details popup
-Temperature
-Precipitation
-Humidity

______________________________________________________________

Data Source:
https://www.kaggle.com/datasets/guillemservera/global-daily-climate-data


Task/File List:
Create database on MongoDB
Create HTML file
Flask App 
Create Javascript file

Data Cleaning Process:

MongoDB Import:
mongoimport --type csv -d project3_weather -c weather_data --headerline --drop weather_data.csv
mongoimport --type csv -d project3_weather -c countries --headerline --drop countries.csv
mongoimport --type csv -d project3_weather -c cities --headerline --drop cities.csv




