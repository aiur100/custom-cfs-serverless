'use strict';
const response = require('../utils/apiResponse');
const { weatherResponse } = require("./../utils/weatherResponse.js");

module.exports.handler = async (event,context) => {
  try{

    const weatherData = await weatherResponse( process.env.weatherApiKey );

    console.info("Weather Response: ",JSON.stringify(weatherData,null,2) );

    return response.buildResponse(200,{
      weatherData
    });
  }
  catch(error){
    console.trace(error);
    console.error("STUPID ERROR OCCURRED",JSON.stringify(error,null,2));
    return response.buildResponse(500,error);
  }
};
