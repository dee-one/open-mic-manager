import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar,faMinusCircle,faAward} from "@fortawesome/free-solid-svg-icons";

library.add(faStar, faMinusCircle,faAward);



 
const SignupItemComponent = (props) => {
    
  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
   
   

   

    // change background colour if dragging
    background: isDragging ? 'red' : 'cornflowerblue',

    // styles we need to apply on draggables
    ...draggableStyle,
  });
    
    
    
    return ( <Draggable 
      key={Math.random()}
      draggableId={props.id.toString()} 
      index={props.index}>
     {(provided,snapshot) => (   
            <li className="comic-list-item"
             ref={provided.innerRef} 
            {...provided.draggableProps} 
            {...provided.dragHandleProps} 
        style={getItemStyle(
          snapshot.isDragging,
          provided.draggableProps.style
        )}
            
            
            > 
         {/* this causes box to break,need to fix */}
        { props.onList &&

          <small>{props.index + 1}</small>
         }
        {/* this causes box to break,need to fix */}
        
          
        <span className="comic-name">{`${props.firstName} ${props.lastName}`}</span>
                {props.headlinerOrFeature &&
                  <span className='accolades'>
                 <FontAwesomeIcon
                  icon="star"
                 />
               <FontAwesomeIcon
                icon="star"
               />
             <FontAwesomeIcon
               icon="star"
              />
          <FontAwesomeIcon
            icon="star"
          />
          <FontAwesomeIcon
            icon="star"
          />
       
                    
                  </span>
                
                }

        {props.firstTimer &&
          <span className='accolades'>first timer </span>
        }
        <span className='comic-points'>{props.points}</span>
     
        
        {props.deleteButton && 
          <button className='comic-points' >
           <FontAwesomeIcon
            icon="minus-circle"
            onClick={() => props.handleOnClick({index: props.index})}
          />
          </button>
        }
        
      </li>
     )}

     
    </Draggable>
    )



      }

export default SignupItemComponent;