import React from 'react';
import { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { updateSetDuration } from '../../slices/list_slice';





export default (props) => {
  const comicIndex = props.index
  // access the comic(user) from list state, check if set_duration parameter is set, use as default state of component
  const checked = useSelector(state => state.list.list[comicIndex].attributes.set_duration)

 const dispatch = useDispatch(); 


 const handleColor = (index) => {
     console.log(index)
        switch(index) {
         case 3:
            return {background: '#F9FF33', color: 'red'};
          case 5:
            return {background: '#f28500', color: 'white' };
          case 7:
           return {background: 'red',color: 'yellow'};
            default:
            return null
      
        }
      
     }

const handleStyle = (index) => (
  // if index of radio button matches index of clicked element, apply a css property.
    checked != index ? null : handleColor(index)
  
  
)






const handleOnClick = (e) => {
    const setDuration = e.target.id
    dispatch(updateSetDuration({ id: props.index,setDuration }))
   
}
    





 return (
     <div className="set-duration">

         <input type="radio" className="radio__input" name="set-duration"  id="3" />
         <label htmlFor="3" className="radio__label" onClick={e => handleOnClick(e)} id="3" style={handleStyle(3)}>THREE</label>
         <input type="radio" className="radio__input"  name="set-duration" id="5"  />
         <label htmlFor="5" className="radio__label" onClick={e => handleOnClick(e)} id="5" style={handleStyle(5)}>FIVE</label>
         <input type="radio" className="radio__input"  name="set-duration" id="7" style={handleStyle(7)} />
         <label htmlFor="7" className="radio__label" onClick={e => handleOnClick(e)} id="7" style={handleStyle(7)}>SEVEN</label>
     </div>



 )




}
