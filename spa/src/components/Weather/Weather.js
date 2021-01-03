import React,{ useState,useEffect } from 'react';
import Condition from "./../Condition/Condition.js"; 

const Weather = () => {

    let [ weatherResponse,  setWeatherResponse ] = useState({});

    function getWeather() {
        fetch(process.env.REACT_APP_API_URL)
                .then(r => r.json())
                .then(r => setWeatherResponse(r) )
                .catch(error => console.error(error));
    }

    useEffect(() => {
        getWeather();
    },[]);

    return (
        <div>
            {JSON.stringify(weatherResponse)}
             <Condition condition={weatherResponse && weatherResponse.weatherData ? weatherResponse.weatherData.weather[0].icon : null} />

        </div>
    )
}

export default Weather;