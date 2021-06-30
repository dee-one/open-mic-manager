
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay, faPause, faFastForward, faFastBackward, faUndo } from "@fortawesome/free-solid-svg-icons";

export default (props) => {



    library.add(faPlay, faPause, faFastForward, faFastBackward,faUndo);



    return (
        <div className="timer">
            
            <FontAwesomeIcon
                onClick={e => props.handleOnBackward(e)}
                icon='fast-backward'
            />

                <FontAwesomeIcon
                    onClick={e => props.handleOnClick(e)}
                    icon={props.icon}
                />

            <FontAwesomeIcon
                onClick={e => props.handleOnForward(e)}
                icon='fast-forward'
            />

            <FontAwesomeIcon
                onClick={e => props.handleOnReset(e)}
                icon='undo'
            />
            
        </div>



    )
} 