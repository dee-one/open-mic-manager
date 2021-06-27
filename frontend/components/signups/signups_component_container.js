import SignUps from "./signups_component";
import { connect } from 'react-redux';
import { fetchSignups} from '../../slices/signups_slice';

import { signupsSlice } from '../../slices/signups_slice'
import { selectLoading,toggleLoading } from "../../slices/loading_slice";
import { fetchList } from "../../slices/list_slice";
import { receiveUser,removeListItem,toggleFilledOut,reorderList} from "../../slices/list_slice";
import { removeUser,receiveSignup } from "../../slices/signups_slice";



const mapStateToProps = state => (
 {
  signups: state.signups.signups,   
  columnId: '1',
  isLoading: selectLoading(state),
  token: state.session.csrfToken,
  list: state.list,
  filledOut: state.list.filledOut

  
 }
);


// user(s) and comic(s) and signup(s) are being used interchangeably, based on what makes contextual sense
const mapDispatchToProps = dispatch => ({

fetchSignups: () => dispatch(fetchSignups()),
reorderSignups: (payload) => dispatch(signupsSlice.actions.reorderSignups(payload)),
toggleLoading: () => dispatch(toggleLoading()),
fetchList: () => dispatch(fetchList()),
receiveUser: (user) => dispatch(receiveUser(user)),
removeUser: (userId) => dispatch(removeUser(userId)),
removeListItem: (listItem) => dispatch(removeListItem(listItem)),
receiveSignup: (signup) => dispatch(receiveSignup(signup)),
toggleFilledOut: () => dispatch(toggleFilledOut()),
reorderList: (payload) => dispatch(reorderList(payload)),
postList: (list) => dispatch(postList(list))
 
});


export default connect(mapStateToProps,mapDispatchToProps)(SignUps);