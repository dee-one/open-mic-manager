import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { incrementSeconds,incrementMinutes,toggleRunning,resetTime } from '../../slices/time_slice';
import TimerButtonsComponent from './timer_buttons_component';
import { nextComic,prevComic, updateList } from '../../slices/list_slice';




export default (props) => {

  const isRunning = useSelector(state => state.time.isRunning);
  const seconds = useSelector(state => state.time.seconds);
  const minutes = useSelector(state => state.time.minutes);
  const dispatch = useDispatch();



  
useEffect(() => {    
  let intervalID;
  if(isRunning) {
    
  intervalID = setInterval(()=> {

   seconds < 59 ? dispatch(incrementSeconds()) : dispatch(incrementMinutes())
   props.sendTime({minutes: minutes, seconds: seconds})
}
  , 1000)
 }
//  stop setInterval from running after component Unmounts
  return () => clearInterval(intervalID);
},[isRunning,seconds,minutes]) // invoke useSelector for isRunning state value to update data on next mount


 
const handleOnClick = (e) => {
 
  e.preventDefault();
  dispatch(toggleRunning());
  
}

const buttonText = () => {
  if(isRunning){
    return "Pause";
  }
return "Start";

}

const handleOnReset = (e) => {
  e.preventDefault();
  isRunning ? dispatch(toggleRunning()) : "";
  dispatch(resetTime());
  props.sendTime({ minutes: 0, seconds: 0 })
}

const handleOnForward = (e) => {
  e.preventDefault();
  if (props.updatedList.current.length === 1) return;
  const updatedList = [...props.updatedList.current]
  dispatch(nextComic());
  updatedList.splice(0,1);
  props.sendList(updatedList);


}

  const handleOnBackward = (e) => {
    e.preventDefault();
    if (props.completedSets.current.length === 0) return;
    const completedSets = [...props.completedSets.current];
    dispatch(prevComic());
    const updatedList = [...props.updatedList.current];
    
    updatedList.unshift(completedSets.pop()[0])
    props.sendList(updatedList);


  }



const icon = !isRunning ? "play" : "pause";

 return (

    <div className="clock">
       <div className="time">
         <div className='minutes' >{minutes.toLocaleString(undefined, { minimumIntegerDigits: 2 })}</div>
          <span>:</span>
         <div className='seconds'>{seconds.toLocaleString(undefined, { minimumIntegerDigits: 2 })}</div>
      </div>
      {props.admin &&
      <TimerButtonsComponent 
        icon={icon} 
        handleOnReset={handleOnReset} 
        handleOnClick={handleOnClick} 
        handleOnForward={handleOnForward}
        handleOnBackward={handleOnBackward}
        buttonText={buttonText}
         />
       }
    </div>


 )



}









