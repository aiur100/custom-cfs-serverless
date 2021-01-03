import React,{ useState,useEffect } from 'react';

const Weather = () => {

    let [ weatherResponse,  setWeatherResponse ] = useState({});

    function getWeather() {
        console.log(process.env.REACT_APP_API_URL);
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
            <h1>Some forecast</h1>
            {JSON.stringify(weatherResponse)}
        </div>
    )
}

export default Weather;