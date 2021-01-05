# Custom Resource Deployed Weather APP

## Logic Flow
* When creating the project
    * Create a new API Gateway Rest API using AWS_PROXY and point it to the Lambda function
    * Create a new S3 Bucket set-up for static websites 
s
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


# Current Todos
* **DONE** - Test/POC deploying the Lambda-backed custom resource using serverless packaging that will include the spa as an artifact
* **DONE** Add S3 static site routines to Custom Resource Lambda. 
* Add code that creates a .env file and adds it to the spa.  The .env file should add the variable for the AWS API Gateway URL that results.  
* Add the code that runs the npm script for building the react app, which should add the environment variable's values to the project