import React, { useState, useContext,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';

import {fetchList} from '../../slices/list_slice';
import { ActionCableContext } from '../root';
import ClockComponent from '../clock/clock_component';
import { Droppable,Draggable,DragDropContext } from 'react-beautiful-dnd';


export default (props) => {

  const cable = useContext(ActionCableContext)
  const [channel, setChannel] = useState(null);
  const list = useSelector(state => state.list.list)
  const dispatch = useDispatch();

  useEffect(() => {

      
      if(!list) {
        dispatch(fetchList())
      }
      
    const channel = cable.subscriptions.create({
      channel: 'ListChannel',
      id: 1

    })

     setChannel(channel);

    return () => {
      channel.unsubscribe();
    }

  
  
  }, []);

  const sendTime = (time) => {
    // const data = { teamId, userId, content }
    const data = { time }; 
    channel.send(data);
  }

  

  return (
    <div>
      {/* {renderedMessages} */}
      {/* <Editor sendMessage={sendMessage} /> */}
      <ClockComponent sendTime={sendTime} admin={true} />
      {/* list of signed up users component */}

     <div>
       {list.map(comic => (
      
       <li>
         {`${comic.first_name} ${comic.last_name}`}
       </li>

       ) ) }
       </div> 
     
   </div>
  )

}