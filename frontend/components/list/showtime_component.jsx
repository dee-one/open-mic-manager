import React from 'react';
import ClockComponent from '../clock/clock_component';
import { useEffect,useContext,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionCableContext } from '../root';
import { receiveTime } from '../../slices/time_slice';
import { fetchList } from '../../slices/list_slice';


export default (props) => {
  const dispatch = useDispatch();
  const time = useSelector(state => state.time);
  const list = useSelector(state => state.list.list);
  const currentUser = useSelector(state => state.session.currentUser);

  const cable = useContext(ActionCableContext);
  
    
   
    useEffect(() => {

     
      
      const channel = cable.subscriptions.create(
            { channel: 'ListChannel' },
            {
                received: (data) => {
                    dispatch(receiveTime(data))
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
    
 



return (
   <div>
    {currentUser && 
    
    <h2>Hey {currentUser.attributes.first_name} have fun and watch that light!</h2>
    
    }


  <ClockComponent admin={false} />
  
  
  {list &&

      <ul className="showtime-list">
        {list.map((comic, index) => (

          <li key={index} >
            {`${index + 1}. ${comic.attributes.first_name} ${comic.attributes.last_name}`}
          </li>

        ))}
      </ul>
  
  
  
  }
  </div>
)






}