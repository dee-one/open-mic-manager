import SignUps from "./signups_component";
import { connect } from 'react-redux';
import { fetchSignups} from '../../slices/comics_slice';

import { comicsSlice } from '../../slices/comics_slice'
import { selectLoading,toggleLoading } from "../../slices/loading_slice";



const mapStateToProps = state => (
 {
  comics: state.comics,   
  columnId: '1',
  isLoading: selectLoading(state),
  token: state.session.csrfToken
  
 }
);

const mapDispatchToProps = dispatch => ({

fetchSignups: () => dispatch(fetchSignups()),
reorderSignups: (payload) => dispatch(comicsSlice.actions.reorderSignups(payload)),
toggleLoading: () => dispatch(toggleLoading())
 
})


export default connect(mapStateToProps,mapDispatchToProps)(SignUps);