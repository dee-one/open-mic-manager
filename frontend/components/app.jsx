import React, {useEffect} from 'react';
import SignUpsComponentContainer from './signups/signups_component_container';
import { Route } from 'react-router';
import SigninComponentContainer from './signin/signin_component_container';
import ListComponent from './list/admin_showtime_component';
import { useDispatch,useSelector } from 'react-redux';
import { fetchCurrentUser } from '../slices/session_slice';
import { AuthRoute,ProtectedRoute,AdminProtectedRoute,AdminAuthRoute } from '../util/route_utils';
import ShowTimeComponent from './list/showtime_component';
import AdminShowtimeComponent from './list/admin_showtime_component';
import AdminSigninComponent from './signin/admin_sign_in_component';
import { toggleLoading } from '../slices/loading_slice';








  

const App = () => {
  const currentUser = useSelector((state) => state.session.currentUser);
  const isLoading = useSelector((state) => state.loading)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleLoading())
    dispatch(fetchCurrentUser())
    .then(() => dispatch(toggleLoading()))

  },[])

  if (isLoading) {
    return (
     <div className="lds-dual-ring"></div>
    );
  }
 
  return (
    <div>
    
     
      
    <AdminProtectedRoute path='/admin/list' component={SignUpsComponentContainer} />
      <AdminProtectedRoute path='/admin/showtime' component={AdminShowtimeComponent} />
  <AuthRoute  path='/sign-in'   component={SigninComponentContainer} />
  <AuthRoute path='/showtime' component={ShowTimeComponent} />
      <AdminAuthRoute path='/admin/signin' component={AdminSigninComponent} />
  </div>
  )
 



}

export default App;