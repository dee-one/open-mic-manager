import React from 'react';
import { useState } from 'react';






export default (props) => {
const [checked,setChecked] = useState({});
 
const handleStyle = (index) => (
  checked != index ? null : {background: 'darkblue',color: 'white'}
  
  
)






const handleOnClick = (e) => {
    setChecked(e.target.id)
   
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
