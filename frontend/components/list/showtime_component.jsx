import React from 'react';
import ClockComponent from '../clock/clock_component';
import { useEffect,useContext,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionCableContext } from '../root';
import { receiveTime } from '../../slices/time_slice';
import { fetchList } from '../../slices/list_slice';


export default (props) => {
  const dispatch = useDispatch();
  const time = useSelector(state => state.time)
  const list = useSelector(state => state.list.list)
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
      
    

        
    
    }, [time,list])
    
 



return (
   <div>
    <p>Showtime!</p>
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