import React, {useEffect} from 'react';
import SignUpsComponentContainer from './signups/signups_component_container';
import { Route } from 'react-router';
import SigninComponentContainer from './signin/signin_component_container';
import ListComponent from './list/admin_showtime_component';
import { useDispatch,useSelector } from 'react-redux';
import { fetchCurrentUser } from '../slices/session_slice';
import { AuthRoute,ProtectedRoute } from '../util/route_utils';
import ShowTimeComponent from './list/showtime_component';
import AdminShowtimeComponent from './list/admin_showtime_component';








  

const App = () => {
  const currentUser = useSelector((state) => state.session.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {

  dispatch(fetchCurrentUser())

  },[])
 
  return (
    <div>
      {currentUser &&
        <h3>
          logged-in : {currentUser.attributes.first_name}
        </h3>
      }
     
      
    <Route exact path='/admin/list' component={SignUpsComponentContainer} />
  {/* <AuthRoute exact path='/'   component={SigninComponentContainer} /> */}
{/* <Route exact path='/sign-in' component={MicFormRulesComponent} /> */}
  <Route exact path='/admin_showtime' component={AdminShowtimeComponent} />
      <Route exact path='/showtime' component={ShowTimeComponent} />
  </div>
  )
 



}

export default App;