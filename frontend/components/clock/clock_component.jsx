import React from 'react';
import { useEffect,useRef } from 'react';

import { useSelector,useDispatch } from 'react-redux';
import { incrementSeconds,incrementMinutes,toggleRunning,resetTime } from '../../slices/time_slice';
import TimerButtonsComponent from './timer_buttons_component';
import { nextComic,prevComic, updateList } from '../../slices/list_slice';




export default (props) => {

  const isRunning = useSelector(state => state.time.isRunning);
  const seconds = useSelector(state => state.time.seconds);
  const minutes = useSelector(state => state.time.minutes);
  const dispatch = useDispatch();
  const updatedSeconds =  useRef(seconds);
  const updatedMinutes = useRef(minutes);


  
useEffect(() => {    
 updatedSeconds.current = seconds;
 updatedMinutes.current = minutes;

  let intervalID;
  if(isRunning) {
    
  intervalID = setInterval(()=> {

   seconds < 59 ? dispatch(incrementSeconds()) : dispatch(incrementMinutes())
    const time = handleTime({ seconds: updatedSeconds.current,minutes: updatedMinutes.current})
    console.log(minutes)
    console.log(time)
   props.sendTime({minutes: time.minutes, seconds: time.seconds})
}
  , 1000)
 }
//  stop setInterval from running after component Unmounts
  return () => clearInterval(intervalID);
},[isRunning,seconds,minutes]) // invoke useSelector for isRunning state value to update data on next mount



  const handleTime = (time) => {
   console.log(time)
    if (time.seconds < 59) {
      time.seconds += 1
      console.log(time)
      return time
    }
    time.seconds = 0;
    time.minutes += 1;
    return time;


  }
 
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
  if (props.currentIndex === (props.listLength - 1)) return;
  // const updatedList = [...props.updatedList.current]
  dispatch(nextComic());
  
  props.sendList({ currentIndex: props.currentIndex + 1 });


}

  const handleOnBackward = (e) => {
    e.preventDefault();
    if (props.currentIndex === 0) return;
    
    dispatch(prevComic());
    
    props.sendList({currentIndex: props.currentIndex - 1});


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









