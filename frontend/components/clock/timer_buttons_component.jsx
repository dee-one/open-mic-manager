
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

export default (props) => {



    library.add(faPlay, faPause);



    return (
        <div className="timer">
            <button type="button" onClick={e => props.handleOnClick(e)} className="timer-buttons">
                <FontAwesomeIcon
                    icon={props.icon}
                />{props.buttonText()}</button>
            <button type="reset" onClick={e => props.handleOnReset(e)} className="timer-buttons">Reset</button>
        </div>



    )
} 