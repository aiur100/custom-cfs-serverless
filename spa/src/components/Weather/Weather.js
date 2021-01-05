import React,{ useState,useEffect } from 'react';
import Condition from "./../Condition/Condition.js"; 
import ConditionDetails from "./../Condition/ConditionDetails.js";

const Weather = () => {

    let [ weatherResponse,  setWeatherResponse ] = useState({});

    function getWeather() {
        fetch(process.env.REACT_APP_API_URL)
                .then(r => r.json())
                .then(r => setWeatherResponse(r) )
                .catch(error => console.error(error))
                .finally(() => console.log("getWeather()",weatherResponse));
    }

    function getWeatherIcons(){
        const defaultResponse = [];
        if(!weatherResponse.weatherData)
            return defaultResponse;
        if(!weatherResponse.weatherData.weather)
            return defaultResponse;
        if(!Array.isArray(weatherResponse.weatherData.weather) || 
            (weatherResponse.weatherData.weather.length > 0) === false)
            return defaultResponse;
        return weatherResponse.weatherData.weather.map(w => {
            return w.icon; 
        });
    }

    useEffect(() => {
        getWeather();
    },[]);

    return (
        <div className="row">
            {getWeatherIcons().map(icon => {
                return <Condition condition={icon} />
            })}
            <div class="col-lg-12">
                <ConditionDetails 
                    weather={weatherResponse.weatherData?.main} 
                    detailed={weatherResponse.weatherData}
                />
            </div>
        </div>
    )
}

export default Weather;