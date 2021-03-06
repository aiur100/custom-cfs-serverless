import React from 'react';

const Condition = (props) => {
    function imgUrl(){
        return `http://openweathermap.org/img/wn/${props.condition}@4x.png`
    }
    return (
        <div className="centerItem"> 
            <img src={imgUrl()}/>
        </div>
    )
}

export default Condition;