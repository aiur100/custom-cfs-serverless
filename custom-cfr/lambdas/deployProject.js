'use strict';
const cloudFormation = require('../utils/cfnResponse');
//const apiGateway = require('../utils/apiGateway');
//const AWS = require('aws-sdk');

module.exports.handler = async (event,context) => {
  /*
  console.info("CF DATA:",JSON.stringify(event,null,2));
  const apiName = process.env.API_NAME;
  const lambdaArn = process.env.API_ARN;

  try{
    
  }catch(error){

  }
  */


  try{
    console.info("EVENT DATA:",JSON.stringify(event,null,2));
    console.info("API_GW_ROLE",process.env.API_GW_ROLE);
    var input = parseInt(event.ResourceProperties.Input);
    var responseData = {Value: input * 5};
    await cloudFormation.asyncResponse(event, context, cloudFormation.SUCCESS, responseData);
    console.log("Response sent successfully");
  }
  catch(error){
    console.trace(error);
    console.error("STUPID ERROR OCCURRED",JSON.stringify(error,null,2));
    await cloudFormation.asyncResponse(event,context,cloudFormation.FAILED,{Value: error.message});
  }
};
