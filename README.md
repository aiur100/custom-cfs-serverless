# Custom Resource 

## Logic Flow
* When creating the project
    * Create a new API Gateway Rest API using AWS_PROXY and point it to the Lambda function
    * Create a new S3 Bucket set-up for static websites 

## Required Environment Files
* `./apiEnv.json` with a single JSON key/value of weatherApiKey from Open Weather Map API.
* `./spa/.env` with `REACT_APP_API_URL=http://localhost:3000/local/` for local development
    * This should be updated for production.  

## Local Developmnet 
To develop locally and increase development cycles, we use `serverless offline` to emulate API gateway locally, and React's own local development scripts. 

There are two short cuts that you need to use to start local development.  Each will continue running in the terminal screens you open, so you will need to have two terminal instances running.
* In one terminal run `npm run local-api` and this will start `serverless offline`. 
    * If successful, visit `http://localhost:3000/` and you should see output from the `weatherApi` lambda function from `./lambdas/weatherApi.js`. 
* In another terminal run `npm run local-spa` and this will run react's `react-scripts start` mapped to port 3006.  
    * If successful, visit `http://localhost:3006` and you should see output from the react app in `spa/src/App.js`. 

# Voice Foundry Weather Web App

This is a weather web app that is powered by DarkSky API, AWS Lambda, AWS API Gateway and AWS S3.  The front-end/client side application is built on React, and the app is deployed to S3 using the S3 static website feature available.  

* The `./api` directory contains the lambda source for the server-side responses.  
* The `./spa` directory (single page application) will contain the web app. 
* The `./tests` directory will contain all tests needed for the API, and the front end tests.

## Functionality
* The React app should use the browser location services to then request weather data from the API GW and Lambda function. 
* We will focus on providing today's temperature and precipitation, and provide a clothing recommendation.   

## Infrastructure
The deployment process should be self-managing, as much as possible. 
* Some questions. 
    * On deploy, create S3 bucket. 
    * Get S3 bucket static URL and output it. 
    * Make sure that the react project can automatically be updated with the API Gateway URL