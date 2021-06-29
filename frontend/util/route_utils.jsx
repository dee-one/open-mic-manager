import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router';





const mapStateToProps = state => ({
  loggedIn: Boolean(state.session.currentUser),
  admin: Boolean(state.session.currentUser) && Boolean(state.session.currentUser.attributes.admin)
});


const Auth = ({loggedIn,path, component: Component}) => (
  <Route 
   path={path}
   render={props => (
   loggedIn ? <Redirect to='/showtime'/> : <Component {...props} />
  )}
  
  />

);

const Protected = ({loggedIn, path, component: Component}) => (
 <Route
 path={path}
 render= {props => (
 loggedIn ? <Component {...props} /> : <Redirect to='/'/>


 )}

 />

);

const Admin= ({ loggedIn,admin, path, component: Component }) => (
  <Route
    path={path}
    render={props => (
      loggedIn && admin ? <Component {...props} /> : <Redirect to='/admin/signin' />


    )}

  />

);






export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
export const AdminRoute = withRouter(connect(mapStateToProps)(Admin));