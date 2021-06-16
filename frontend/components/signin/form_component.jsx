import React from 'react';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPhone, faEnvelope, faUser, faCheckSquare } from "@fortawesome/free-solid-svg-icons";

library.add(faEnvelope, faPhone,faUser,faCheckSquare);



export default (props) => {


    return  ( <form onSubmit={this.handleSubmit} >
        <label>
           <FontAwesomeIcon
             icon="user"
           />
           <input type="text" name="firstName" placeholder='First Name' value={this.state.firstName} onChange={e => this.handleOnChange(e)}/>
         </label>
        
      
        <label>

           <FontAwesomeIcon
             icon="user"
           />
           <input type="text" name="lastName" placeholder='Last Name' value={this.state.lastName} onChange={e => this.handleOnChange(e)}/>
        </label>
        <label>
           <FontAwesomeIcon
             icon="envelope"
           />
           <input type="email" name="email" placeholder='Your Email' required value={this.state.email} onChange={e => this.handleOnChange(e)}/>
         </label>
      
         <label>
           <FontAwesomeIcon
             icon="phone"
           />
           <input type="tel" name="phoneNumber" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" maxLength='12' placeholder='281-330-8004' value={this.state.phoneNumber} onChange={e => this.handleOnChange(e)}/>
         </label>
         <label className="check-box">
           <input type="checkbox" name="firstTimer" value={this.state.firstTimer} onChange={e => this.handleOnChange(e)}/>
            <span>First Timer?</span>
        </label>
 </form>        
)

}