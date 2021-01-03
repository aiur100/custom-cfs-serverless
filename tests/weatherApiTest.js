const fetch = require('node-fetch');
const { weatherApiKey } = require("./../apiEnv.json");
const { weatherResponse } = require("./../utils/weatherResponse.js");

weatherResponse( weatherApiKey ).then(r => console.log(r));