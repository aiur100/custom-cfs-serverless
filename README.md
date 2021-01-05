# Custom Resource Deployed Weather APP
Christopher R. Hill (Chill)
## Overview
---
This is a self-contained weather app project.  We use React from the front-end, API Gateway and Lambda together as the back-end, and host the React app on an S3 static site.

This project is built on the `serverless` framework and we use AWS CloudFormation and a CloudFormation custom resource to wire up the whole project on deployment. 

### Custom Resource Procedures

* When deploying the project, a single lambda-backed cloudformation custom resource does the following:
    * Create a new API Gateway Rest API using AWS_PROXY and point it to the Lambda function
    * Create a new S3 Bucket set-up for static websites. 
    * Runs the `build.sh` file that is at the root of this project which runs the React build functions, and configs the react app to point to the API Gateway URL created.
    * Puts all the react build files on the S3 Bucket that is now a static website.
* When running deployment that will update the project, the same lambda-backed cloudformation resource does the following - CF Update request type:
  * If anything about the API itself (the name, is the only thing right now) has changed we re-create the API Gateway. 
  * Or if the API doesn't exist, we create it. 
  * If the bucket needed doesn't exist, we created it.  The bucket name is composed of the serverless service and the stage.  
  * We run `build.sh` to build the react app, and deploy the code to the static S3 bucket. 

### Project structure
* `./lambdas` - contains the lambda functions.
  * `./lambdas/deployProject.js` - This is the lambda function used by the deployment custom resource. There is no easy method of local development of this script, please avoid changing this, unless you know what you're doing. :) 
  * `./lambdas/weatherApi.js` - This is the lambda function that responds to weather data requests for Tulsa, OK. 
* `serverless.yml` - This is the main *serverless framework* config file. YAML format.
  * `<dev|prod|local>.yml` - These are the sub config files for the `weatherApi` lambda function.  
* `./spa` - This contains the React Tulsa, OK Weather App.  
* `./utils` - This contains the various abstracted functions needed for both the `deployProject` and `weatherApi` lambda functions. 
* `./build.sh` - This is used during the deployment process.  This moves the `spa` to the Lambda environment `/tmp` directory (because that's where you can write in Lambda) and the react build process is run.  This also configures the React App with the API Gateway URL that is passed to it.  
* `tests` - These tests are really more POC's for me at this time, if I don't get time to change these, that's what they will be. 
* `config.js` - This is a simple function that will generate a random number.  I use this to ensure the AWS Custom Resource to run every time. 

## Getting started
---
### Requirements 
* NodeJS 12 or higher. 
* The serverless framework.

  * If you have node already, run `npm install -g serverless`
  * Documentation on serverless getting started: https://www.serverless.com/framework/docs/getting-started/

* Install dependencies for this project & api. Run `npm install` on project root directory.
* If you want to run the React Weather app locally (spa), `cd spa` and then `npm install`.

### Required Environment Files
* `./apiEnv.json` with a single JSON key/value of weatherApiKey from RapidAPI's "Open Weather Map API". 
  * Subscribe to a free API key here https://rapidapi.com/community/api/open-weather-map
  * **WARNING:** Do not use an API key directly from Open Weather Map -- it will not work by default. 
    ```
    {
        "weatherApiKey":"<YOUR-SECRET-KEY>"
    }
    ``` 
* `./spa/.env` with `REACT_APP_API_URL=http://localhost:3000/local/` for local development
    * **IMPORTANT**: When deployed using the procedure described below, the value here is automatically generated and configured with the API Gateway execute URL. 

## Local Developmnet 
---
To develop locally and increase development speed, we use `serverless offline` to emulate API gateway locally, and React's own local development scripts. 

There are two short cuts that you need to use to start local development.  Each will continue running in the terminal screens you open, so you will need to have two terminal instances running.
1. *If you haven't already* Install dependencies for api and spa - Root project directory `npm install` and then `cd spa` and `npm install`, then go back to the root project directory `cd ..`
2. **Start local api server**: In one terminal run `npm run local-api` and this will start `serverless offline`. 
    * If successful, visit `http://localhost:3000/` and you should see output from the `weatherApi` lambda function from `./lambdas/weatherApi.js`. 
3. **Start local react app & server**: In another terminal run `npm run local-spa` and this will run react's `react-scripts start` mapped to port 3006.  
    * If successful, visit `http://localhost:3006` and you should see output from the react app in `spa/src/App.js`. 

## Deployment
---
### Requirements
* `apiEnv.json` file must exist at the project root. 
  * Add the following JSON with your Open Weather Map API key. 
  ```
    {
        "weatherApiKey":"<YOUR-SECRET-KEY>"
    }
  ```  
* Ensure that you have an aws profile set-up for a user that has a full system admin role
---

### Steps 
* Run `sls deploy --stage [prod|dev] --aws-profile <your-profile>`
  * If you're using your default AWS profile, just omit the `--aws-profile` flag.
  * **Example:** `sls deploy --stage dev --aws-profile my-profile`

**WARNING:** This first deployment always takes the longest time.  Generally, this deployment will take a few minutes every time, so this is not recommended for development.


# Current Todos
* **DONE** - Test/POC deploying the Lambda-backed custom resource using serverless packaging that will include the spa as an artifact
* **DONE** Add S3 static site routines to Custom Resource Lambda. 
* **DONE** Add code that creates a .env file and adds it to the spa.  The .env file should add the variable for the AWS API Gateway URL that results.  
* **DONE** Add the code that runs the npm script for building the react app.
* Clean up and refactor code. 
* Look into react's testing framework and see if we can use that for some e2e/integration testing
* **DONE** - Ensure that deletes and updates are handled in the custom resource stack
* Update 
* **DONE** - Add outputs for the API url and the S3 website url. 