'use strict';
const response = require('../utils/apiResponse');

module.exports.handler = async (event,context) => {
  try{
    return response.buildResponse(200,{message:"Hello world",event});
  }
  catch(error){
    console.trace(error);
    console.error("STUPID ERROR OCCURRED",JSON.stringify(error,null,2));
    return response.buildResponse(500,error);
  }
};
