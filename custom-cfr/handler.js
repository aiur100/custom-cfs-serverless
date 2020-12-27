'use strict';
const response = require('./cfnResponse');

module.exports.testCustomResource = async (event,context) => {
  try{
    console.info("EVENT DATA:",JSON.stringify(event,null,2));
    var input = parseInt(event.ResourceProperties.Input);
    var responseData = {Value: input * 5};
    await response.asyncResponse(event, context, response.SUCCESS, responseData);
    console.log("Response sent successfully");
  }
  catch(error){
    console.trace(error);
    console.error("STUPID ERROR OCCURRED",JSON.stringify(error,null,2));
    await response.asyncResponse(event,context,response.FAILED,{Value: error.message});
  }
};
