
import React from 'react';
import { adminLogin } from '../../slices/session_slice';
import { useState } from 'react';



export default () => {

const [username,setUsername] = useState({});
const [password,setPassword] = useState({});



const handleOnSubmit = () => {

    adminLogin({username,password})
     .then(res => res.json())
     .then(data => this.props.receiveLogin({ currentUser: data }))


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
    console.log(username)
    console.log(password)
  

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
 <input type="text" onChange={e => handleOnChange(e)} name="password"></input>
 </label>
  
<button type="submit" onSubmit={() => handleOnSubmit()}>Login</button>

</div>

)





}