import React, {useEffect} from 'react';
import SignUpsComponentContainer from './signups/signups_component_container';
import { Route } from 'react-router';
import SigninComponentContainer from './signin/signin_component_container';
import ListComponent from './list/admin_showtime_component';
import { useDispatch,useSelector } from 'react-redux';
import { fetchCurrentUser } from '../slices/session_slice';
import { AuthRoute,ProtectedRoute,AdminRoute } from '../util/route_utils';
import ShowTimeComponent from './list/showtime_component';
import AdminShowtimeComponent from './list/admin_showtime_component';
import AdminSigninComponent from './signin/admin_sign_in_component';







  

const App = () => {
  const currentUser = useSelector((state) => state.session.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {

  dispatch(fetchCurrentUser())

  },[])
 
  return (
    <div>
    
     
      
    <AdminRoute exact path='/admin/list' component={SignUpsComponentContainer} />
  <AuthRoute exact path='/'   component={SigninComponentContainer} />
{/* <Route exact path='/sign-in' component={MicFormRulesComponent} /> */}
  <AdminRoute exact path='/admin/showtime' component={AdminShowtimeComponent} />
      <Route exact path='/showtime' component={ShowTimeComponent} />
      <Route exact path='/admin/signin' component={AdminSigninComponent} />
  </div>
  )
 



}

export default App;