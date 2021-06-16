import React from 'react';
import ClockComponent from '../clock/clock_component';
import { useEffect,useContext,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionCableContext } from '../root';
import { receiveTime } from '../../slices/time_slice';

export default (props) => {
   const dispatch = useDispatch();
  const time = useSelector(state => state.time)
  const cable = useContext(ActionCableContext);
    
   
    useEffect(() => {
      const channel = cable.subscriptions.create(
            { channel: 'ListChannel' },
            {
                received: (data) => {
                    dispatch(receiveTime(data))
                },
            }
        )
      
    

        
    
    }, [time])
    
 



return (
   <div>
    <p>Showtime!</p>
  <ClockComponent admin={false} />
  </div>
)






}