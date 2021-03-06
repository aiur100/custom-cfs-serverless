'use strict';

module.exports.handler = async (event,context) => {
  const cloudFormation = require('../utils/cfnResponse'); 
  const requestType = event.RequestType;
  try{

    const gApi = require('../utils/apiGateway');
    const { s3Create,copyFolder,deleteBucket } = require("../utils/s3utils");
    const AWS = require('aws-sdk');

    const { ApiArn, ApiName, ApiRole, Stage, BucketName, Region } = 
        event.ResourceProperties;

    AWS.config.region = Region;

    console.info("EVENT DATA:",JSON.stringify(event,null,2));
    console.info("API INFO", ApiArn, ApiName, ApiRole);

    let currentApi = await gApi.findApi( ApiName, AWS);

    /**
     * If a Delete request is received, this block of 
     * code is executed, and nothing else.
     */
    if(requestType === "Delete"){
      console.info("Deleting Stack Request received.");

      if(currentApi){
        console.info("Deleting API Gateway...")
        await gApi.deleteApi(currentApi.id,AWS);
        console.info(`API Gateway ${currentApi.id} was deleted.`)
      }

      await deleteBucket(BucketName,AWS);

      await cloudFormation.asyncResponse(event, 
        context, 
        cloudFormation.SUCCESS, {
          BucketName
        },
        event.PhysicalResourceId
      );

      return Promise.resolve({ success: true });
    }

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

    if(requestType === "Update" || requestType === "Create"){
      const created = await s3Create(BucketName,AWS);

      if(created){
        console.info(`${BucketName} was created`);
      }
      else{
        console.info(`${BucketName} was not created because it already exists`);
      }
    }

    const apiUrl = gApi.executeApiUrl(currentApi.id,Stage,Region)+"/weather";

    if(requestType === "Update" || requestType === "Create"){
      const { npmRunBuild } = require("../utils/npmRunBuild");
      await npmRunBuild(apiUrl);
      await copyFolder("/tmp/spa/build",BucketName);
    }
    
    const responseData = { 
      ApiUrl: apiUrl,
      WebUrl: `http://${BucketName}.s3-website-${Region}.amazonaws.com/`
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
    console.error("ERROR OCCURRED",JSON.stringify(error,null,2));
    await cloudFormation.asyncResponse(event,context,cloudFormation.FAILED,{Value: error.message});
  }
};
