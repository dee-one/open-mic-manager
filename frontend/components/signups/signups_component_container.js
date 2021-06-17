import SignUps from "./signups_component";
import { connect } from 'react-redux';
import { fetchSignups} from '../../slices/comics_slice';

import { comicsSlice } from '../../slices/comics_slice'
import { selectLoading,toggleLoading } from "../../slices/loading_slice";
import { fetchList } from "../../slices/list_slice";
import { receiveUser } from "../../slices/list_slice";
import { removeUser } from "../../slices/comics_slice";



const mapStateToProps = state => (
 {
  comics: state.comics,   
  columnId: '1',
  isLoading: selectLoading(state),
  token: state.session.csrfToken,
  list: state.list
  
 }
);

const mapDispatchToProps = dispatch => ({

fetchSignups: () => dispatch(fetchSignups()),
reorderSignups: (payload) => dispatch(comicsSlice.actions.reorderSignups(payload)),
toggleLoading: () => dispatch(toggleLoading()),
fetchList: () => dispatch(fetchList()),
receiveUser: (user) => dispatch(receiveUser(user)),
removeUser: (userId) => dispatch(removeUser(userId))
 
})


export default connect(mapStateToProps,mapDispatchToProps)(SignUps);