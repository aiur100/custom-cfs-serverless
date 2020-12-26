# Voice Foundry Weather Web App

This is a weather web app that is powered by DarkSky API, AWS Lambda, AWS API Gateway and AWS S3.  The front-end/client side application is built on React, and the app is deployed to S3 using the S3 static website feature available.  

* The `./api` directory contains the lambda source for the server-side responses.  
* The `./spa` directory (single page application) will contain the web app. 
* The `./tests` directory will contain all tests needed for the API, and the front end tests.

## Functionality
* The React app should use the browser location services to then request weather data from the API GW and Lambda function. 
* We will focus on providing today's temperature and precipitation, and provide a clothing recommendation.   