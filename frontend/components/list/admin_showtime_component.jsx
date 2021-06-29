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

      console.log('list',list)
      if(!list) {
        dispatch(fetchList())
      }
      
    const channel = cable.subscriptions.create({
      channel: 'ListChannel',
      id: 1

    })

     setChannel(channel);

    return () => {
      cable.disconnect();
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
      <h2>List</h2>

     {list &&
     <ul className="showtime-list">
       {list.map((comic,index) => (
      
       <li key={index} >
         {`${index + 1}. ${comic.attributes.first_name} ${comic.attributes.last_name}`}
       </li>

       ) ) }

      
       </ul> 
      } 
   </div>
  )

}