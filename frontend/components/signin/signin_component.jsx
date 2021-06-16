import React from 'react';

import {NavLink} from 'react-router-dom';
import signin_rules_1_component from './signin_rules _1_component';
import signin_rules_2_component from './signin_rules_2_component';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPhone, faEnvelope, faUser, faCheckSquare } from "@fortawesome/free-solid-svg-icons";

library.add(faEnvelope, faPhone, faUser, faCheckSquare);




class SigninComponent extends React.Component  {
  constructor(props){
   super(props)

   this.handleSubmit = this.handleSubmit.bind(this)
   this.onChange = this.handleOnChange.bind(this)
   this.state = {firstName: '',lastName: '',email: '', phoneNumber: '',firstTimer: false}
 
  }



  getCSRFToken = () => {
    console.log(unescape(document.cookie.split('=')[1]))
   return unescape(document.cookie.split('=')[1])
  }


 handleSubmit = (e) => {
  e.preventDefault();
  //  const csrfToken = document.querySelector("[name='csrf-token']").content
   


   const request = {
     method: 'post',
     credentials: 'include',
     headers: {
         'X-CSRF-Token': this.getCSRFToken(),
         'Content-Type': 'application/json' 
     },
     body: JSON.stringify({comic: this.state}),
     
   };

   fetch('http://localhost:3000/api/users',request)
   .then(res => res.json())
     .then(data => this.props.receiveLogin({ currentUser: data }))
     .then(() => {this.setState({ firstName: '', lastName: '', email: '', phoneNumber: '',firstTimer: false }
           )})
      .then(() => this.props.history.replace('/showtime') )



 }

 handleOnChange = (e) => {
   if(e.target.name !== 'firstTimer'){
   this.setState({[e.target.name]: e.target.value})
    return; 
   }
   this.toggleNew()
 }

  toggleNew = () => {
    
   this.state.firstTimer ? this.setState({firstTimer: false}) : this.setState({firstTimer: true});
    
  }

  handleOnClick = (e) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(re.test(this.state.email) && !this.props.isCompleted){
       this.props.toggleCompleted()
      }
    if (this.props.isCompleted && re.test(this.state.email)){
        this.handleSubmit(e)
      }
  }

 render = ()  =>  {

   const bodyComponent = this.props.isCompleted ? signin_rules_2_component : signin_rules_1_component


     return (
     <div className="Sign-in">
     <h2 className='Header-title'> CCU Open Mic Signup!</h2>
         <NavLink to='/admin/list' >
             <b>list</b>
         </NavLink>

   

      {bodyComponent()}

       
       
         {!this.props.isCompleted &&
       <form id="signin-form">
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

         }



   <div className="button-container"><button onClick={this.handleOnClick} type="submit" form="signin-form">login</button></div>


    </div>

         )



 }; 






}

export default SigninComponent;