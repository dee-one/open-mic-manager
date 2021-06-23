import React from "react";

import { useDispatch } from "react-redux";
import SignupItemComponent from "../signups/signup_item_component";




export default (props) => {
const dispatch = useDispatch();
const { provided, innerRef} = props;

 const draggingOver = props.isDraggingOver;

 const handleClassName  = () => {
   
  return draggingOver ? 'comic-list-item hidden' : 'comic-list-item';

  }



 

    if(props.className === 'rough-draft') {


    
   return ( <ul {...provided.droppableProps} ref={innerRef} className={props.className} >
      {props.signupsOrList.map((comic, index) => (
         <SignupItemComponent
            
            index={index}
            id={index.toString()}
            firstName={comic.attributes.first_name}
            lastName={comic.attributes.last_name}
            points={comic.attributes.points}
            className='comic-list-item'
            key={Math.random()}
            firstTimer={comic.attributes.first_timer}
            headlinerOrFeature={comic.attributes.headliner_or_feature}
            handleOnClick={false}
            onList={props.filledOut ? true : null}
            filledOut={props.filledOut}
            droppableId={props.columnId}
         >

         </SignupItemComponent>

      ))}
      {provided.placeholder}



   </ul>
     )
      }

  return (

    
   
  
      <ul
        {...provided.droppableProps} 
        ref={innerRef}
        
        className={props.className}
   
       
     >
        
           <span className='list-box-text'><h2>drag comics to create list </h2></span>
         
        {props.list.map((comic, index) => (
           <SignupItemComponent
              index={index}
              id={props.signups.length + index}
              firstName={comic.attributes.first_name}
              lastName={comic.attributes.last_name}
              className={handleClassName()}
              key={Math.random()}
              handleOnClick={props.handleOnClick}
              toggleFilledOut={props.toggleFilledOut}
              deleteButton={true}

           >

           </SignupItemComponent>

        ))}
        {provided.placeholder}
     </ul>






  )
   




}