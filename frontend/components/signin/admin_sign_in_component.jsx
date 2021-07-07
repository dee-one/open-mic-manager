
import React from 'react';
import { adminLogin} from '../../slices/session_slice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';




export default () => {

const [username,setUsername] = useState({});
const [password,setPassword] = useState({});
const dispatch = useDispatch();



const handleOnClick = () => {

    const params = {username,password}
    dispatch(adminLogin(params))

    


}

const handleOnChange = (e) => {
    
    switch(e.target.name) {
     case 'username':
         setUsername(e.target.value);
         break;
     case 'password':
         setPassword(e.target.value);
         break;
 


    }
  
  

}




return (
   <div>
  <h2>Log In</h2>


  <label>
   username
  <input type="text" onChange={e => handleOnChange(e)} name="username"></input>
 </label>
<label>
  password
 <input type="password" onChange={e => handleOnChange(e)} name="password"></input>
 </label>
  
<button type="submit" onClick={() => handleOnClick()}>Login</button>

</div>

)





}