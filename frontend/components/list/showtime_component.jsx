import React from 'react';
import ClockComponent from '../clock/clock_component';
import { useEffect,useContext,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionCableContext } from '../root';
import { receiveTime } from '../../slices/time_slice';
import { fetchList,updateList,receiveCurrentlyPeformingIndex } from '../../slices/list_slice';


export default (props) => {
  const dispatch = useDispatch();
  const time = useSelector(state => state.time);
  const list = useSelector(state => state.list.list);
  const currentIndex = useSelector(state => state.list.currentlyPeformingIndex);
  const currentComic = list && list[currentIndex];
  const currentUser = useSelector(state => state.session.currentUser);

  const cable = useContext(ActionCableContext);
  
    
   
    useEffect(() => {

     
      
      const channel = cable.subscriptions.create(
            { channel: 'ListChannel' },
            {
                received: (data) => {
                     
                    data.time ? dispatch(receiveTime(data)) : dispatch(receiveCurrentlyPeformingIndex(data))
                },
            }
        );
      if (!list) {
        dispatch(fetchList())
      }
      
    return () => {
      channel.unsubscribe()
      }

      
    
    }, []);
    
  const handleStyle = (comic) => {


    return comic.id === currentComic.id ? { fontWeight: 'bold' } : { fontWeight: 'normal' }


  }



return (
   <div className="clock-list-container">

    <div className='player'>
    {currentUser && 
    
    <h2>Hey {currentUser.attributes.first_name} have fun and watch that light!</h2>
    
    }


  <ClockComponent admin={false} />
  
  </div>
  {list &&

      <ul className="showtime-list">
        {list.map((comic, index) => (

          <li key={index} style={handleStyle(comic)} >
            {`${index + 1}. ${comic.attributes.first_name} ${comic.attributes.last_name}`}
            
          </li>

        ))}
      </ul>
  
  
  
  }
  </div>
)






}