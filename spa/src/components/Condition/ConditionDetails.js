import React from 'react';

const ConditionDetails = (props) => {
    console.log(props);
    return (
        <div className="card">
            <div className="card-header">
                <h3 className="card-title">Condition Details</h3>
            </div>
            <div className="card-body centerItem">              
                <table className="table table-striped ">
                    <tr>
                        <td><b>Current Temp.</b></td>
                        <td>{props.weather?.temp}&#8457;</td>
                    </tr>
                    <tr>
                        <td><b>But it feels more like</b></td>
                        <td>{props.weather?.feels_like}&#8457;</td>
                    </tr>
                    <tr>
                        <td><b>Today's Max Temp.</b></td>
                        <td>{props.weather?.temp_max}&#8457;</td>
                    </tr>
                    <tr>
                        <td><b>Today's Min Temp.</b></td>
                        <td>{props.weather?.temp_min}&#8457;</td>
                    </tr>
                    <tr>
                        <td><b>Humidity</b></td>
                        <td>{props.weather?.humidity}%</td>
                    </tr>
                    <tr>
                        <td><b>Sky</b></td>
                        <td>{props.detailed?.weather[0]?.description}</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default ConditionDetails;