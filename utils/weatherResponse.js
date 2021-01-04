async function weatherResponse(apiKey){
    const fetch = require('node-fetch');
    const URL = "https://community-open-weather-map.p.rapidapi.com/weather?q=tulsa&mode=json&units=imperial";
    try{
        const response = await fetch(URL, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": apiKey,
            }
        }).then(r => r.json());
        return response;
    }
    catch(error){
        return Promise.reject(error);
    }
}

module.exports = { weatherResponse };