'use strict';
//const apiGateway = require('../utils/apiGateway');
//const AWS = require('aws-sdk');

module.exports.handler = async (event,context) => {
  
  try{
    const cloudFormation = require('../utils/cfnResponse'); 
    const gApi = require('../utils/apiGateway');

    const { ApiArn, ApiName, ApiRole, Stage } = event.ResourceProperties;

    console.info("EVENT DATA:",JSON.stringify(event,null,2));
    console.info("API INFO", ApiArn, ApiName, ApiRole);
    const AWS = require('aws-sdk');

    if(!gApi.doesApiAlreadyExists( ApiName )){
        await gApi.createApiGateway({
          AWS,
          lambdaArn: ApiArn,
          role: ApiRole,
          apiName: ApiName,
          stage: Stage
        });
    }

    if(event.RequestType === "Update"){

      const { oldApiArn, oldApiName } = event.OldResourceProperties;

    }

    var input = parseInt(event.ResourceProperties.Input);
    var responseData = {Value: input * 5};
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
