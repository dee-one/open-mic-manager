import { connect } from "react-redux";
import MicFormComponent from "./signin_component";

import { toggleCompleted,selectCompleted } from "../../slices/form_slice";
import { receiveLogin,comicLogin } from "../../slices/session_slice";




const mapStateToProps = state =>  ({
   isCompleted: selectCompleted(state)


})


const mapDispatchToProps = dispatch => ({
  
   receiveLogin: (payload) => dispatch(receiveLogin(payload)),
   toggleCompleted: () => dispatch(toggleCompleted()),
   comicLogin: (user) => dispatch(comicLogin(user))

   
  
})


export default connect(mapStateToProps,mapDispatchToProps)(MicFormComponent);