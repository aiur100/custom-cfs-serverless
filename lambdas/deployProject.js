'use strict';

module.exports.handler = async (event,context) => {
  const cloudFormation = require('../utils/cfnResponse'); 
  const requestType = event.RequestType;
  try{
    const gApi = require('../utils/apiGateway');
    const AWS = require('aws-sdk');
    AWS.config.region = 'us-east-1';

    const { ApiArn, ApiName, ApiRole, Stage, BucketName } = event.ResourceProperties;

    console.info("EVENT DATA:",JSON.stringify(event,null,2));
    console.info("API INFO", ApiArn, ApiName, ApiRole);

    let currentApi = await gApi.findApi( ApiName, AWS);

    /**
     * If the API is not found, 
     * create the API. 
     */
    if((requestType === "Update" || requestType === "Create") && currentApi === null){
      console.info("Creating API...");
      currentApi = await gApi.createApiGateway({
          AWS,
          lambdaArn: ApiArn,
          role: ApiRole,
          apiName: ApiName,
          stage: Stage
      });
      console.info("API Created",JSON.stringify(currentApi,null,2));
    }


    if(requestType === "Update" && event.OldResourceProperties){
      const old = event.OldResourceProperties;
      const recreateAPi = (old.ApiName && old.ApiName !== ApiName) || 
                          (old.ApiRole && old.ApiRole !== ApiRole) || 
                          (old.ApiArn && old.ApiArn !== ApiArn) ||
                          (old.stage && old.stage !== stage);

      if(recreateAPi){
        console.info("Deleting API",currentApi);
        await gApi.deleteApi(currentApi.id,AWS);
        console.info("Deleted API",currentApi.id);

        currentApi = await gApi.createApiGateway({
          AWS,
          lambdaArn: ApiArn,
          role: ApiRole,
          apiName: ApiName,
          stage: Stage
        });
        console.info("API Re-Created",JSON.stringify(currentApi,null,2));
      }
    }

    const { s3Create,copyFolder } = require("../utils/s3utils");

    if(requestType === "Update" || requestType === "Create"){
      const created = await s3Create(BucketName,AWS);

      if(created){
        console.info(`${BucketName} was created`);
      }
      else{
        console.info(`${BucketName} was not created because it already exists`);
      }
    }

    const apiUrl = gApi.executeApiUrl(currentApi.id,Stage)+"/weather";

    if(requestType === "Update" || requestType === "Create"){
      const { npmRunBuild } = require("../utils/npmRunBuild");
      await npmRunBuild(apiUrl);
      await copyFolder("/tmp/spa/build",BucketName);
    }
    
    const responseData = { 
      apiUrl
    };
    await cloudFormation.asyncResponse(event, 
      context, 
      cloudFormation.SUCCESS, 
      responseData,
      event.PhysicalResourceId
    );

    console.log("Response sent successfully");
  }
  catch(error){
    console.trace(error);
    console.error("STUPID ERROR OCCURRED",JSON.stringify(error,null,2));
    await cloudFormation.asyncResponse(event,context,cloudFormation.FAILED,{Value: error.message});
  }
};
