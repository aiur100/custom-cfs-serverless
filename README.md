# Custom Resource Deployed Weather APP
Christopher R. Hill (Chill)
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
1. `npm install`
2. In one terminal run `npm run local-api` and this will start `serverless offline`. 
    * If successful, visit `http://localhost:3000/` and you should see output from the `weatherApi` lambda function from `./lambdas/weatherApi.js`. 
3. In another terminal run `npm run local-spa` and this will run react's `react-scripts start` mapped to port 3006.  
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
* Run `sls deploy --stage <whatever-stage-you-want> --aws-profile <your-profile>`
  * If your using your default AWS profile, just omit the `--aws-profile` flag.
  * **Example:** `sls deploy --stage dev --aws-profile my-profile`

**WARNING:** This first deployment always takes the longest time.  Generally, this deployment will take a few minutes every time, so this is not recommended for development.


# Current Todos
* **DONE** - Test/POC deploying the Lambda-backed custom resource using serverless packaging that will include the spa as an artifact
* **DONE** Add S3 static site routines to Custom Resource Lambda. 
* **DONE** Add code that creates a .env file and adds it to the spa.  The .env file should add the variable for the AWS API Gateway URL that results.  
* **DONE** Add the code that runs the npm script for building the react app.
* Clean up and refactor code. 
* Look into react's testing framework and see if we can use that for some e2e/integration testing
* Ensure that deletes and updates are handled in the custom resource stack
* Update 