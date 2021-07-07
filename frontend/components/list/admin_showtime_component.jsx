import React, { useState, useContext,useEffect,useRef } from 'react';
import { useSelector,useDispatch } from 'react-redux';

import { fetchList, getCurrrentlyPeformingIndex } from '../../slices/list_slice';
import { ActionCableContext } from '../root';
import ClockComponent from '../clock/clock_component';



export default (props) => {

  const cable = useContext(ActionCableContext)
  const [channel, setChannel] = useState(null);
  const list = useSelector(state => state.list.list)
  const listLength = list && list.length;
  const updatedList = useRef(list);
  const completedSets = useSelector(state => state.list.completedSet);
  const updatedCompletedSets = useRef(completedSets);
  const currentIndex = useSelector(state => state.list.currentlyPeformingIndex)
  const currentComic = list && list[currentIndex];
 
   

  const dispatch = useDispatch();
  
  useEffect(() => {
      updatedList.current = list;
      updatedCompletedSets.current = completedSets;
    
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

  
  
  }, [list]);



  const sendTime = (time) => {
    // const data = { teamId, userId, content }
    const data = { time }; 
    channel.send(data);
  }


  const sendList = (index) => {
    // const data = { teamId, userId, content }
    const data = index;
    channel.send(data);
  }

  const handleStyle = (comic) => {
   
    
   return comic.id === currentComic.id ? {fontWeight: 'bold'} : {fontWeight: 'normal'}


  }

  

  return (
    <div className="clock-list-container">
      {/* {renderedMessages} */}
      {/* <Editor sendMessage={sendMessage} /> */}

      <div className='player'>
      <ClockComponent sendTime={sendTime} admin={true} sendList={sendList} list={list} updatedList={updatedList} completedSets={updatedCompletedSets} currentIndex={currentIndex} listLength={listLength}  />
      {/* list of signed up users component */}
      {currentComic &&
      <div className="current-comic-info">
      
         <h2>{`${currentComic.attributes.first_name} ${currentComic.attributes.last_name}`}</h2>
         <p>{`${currentComic.attributes.set_duration} minutes`}</p>
         
      
        </div>
       } 

      </div>

     {list &&
     <ul className="showtime-list">
       {list.map((comic,index) => (
      
       <li key={index} style={handleStyle(comic)} >
         {`${index + 1}. ${comic.attributes.first_name} ${comic.attributes.last_name}`}
       </li>

       ) ) }

      
       </ul> 
      } 
   </div>
  )

}