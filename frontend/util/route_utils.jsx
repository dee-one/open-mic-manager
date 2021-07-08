import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router';
import { adminLogin } from '../slices/session_slice';






const mapStateToProps = (state,ownProps) => ({


  loggedIn: Boolean(state.session.currentUser),
    admin: Boolean(state.session.currentUser) && Boolean(state.session.currentUser.attributes.admin)
});



const Auth = ({loggedIn,admin,path, component: Component}) => (
  <Route 
   exact path={path}
   render= {props => (
  
     loggedIn && !admin ? <Redirect to='/showtime' /> : <Component {...props} />

   /*
   if(!loggedIn && !admin){return <Component {...props} />}
    console.log(props)
     return <Redirect to='/admin/showtime'/>
  */
)}
  />

);

const Protected = ({loggedIn,admin, path, component: Component}) => (
 <Route
 exact path={path}
 render= {props => (
 loggedIn && !admin ? <Component {...props} /> : <Redirect to='/'/>


 )}

 />

);

const AdminAuth = ({ loggedIn,admin, path, component: Component }) => (
  <Route
    exact path={path}
    render={props => (
       !admin ? <Component {...props} /> : <Redirect to='/admin/list' />


    )}

  />

);

const AdminProtected = ({ loggedIn, admin, path, component: Component }) => {

    
 return (
      <Route
    exact path={path}
    render={props => (
      loggedIn && admin ? <Component {...props} /> : <Redirect to='/admin/signin' />


    )}

  />

 )};







export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
export const AdminProtectedRoute = withRouter(connect(mapStateToProps)(AdminProtected));
export const AdminAuthRoute = withRouter(connect(mapStateToProps)(AdminAuth));