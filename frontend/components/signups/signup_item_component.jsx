import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar,faMinusCircle,faAward} from "@fortawesome/free-solid-svg-icons";

library.add(faStar, faMinusCircle,faAward);



 
const SignupItemComponent = (props) => {


    return ( <Draggable 
      key={Math.random()}
      draggableId={props.id.toString()} 
      index={props.index}>
     {(provided,snapshot) => (   
            <li className={props.className}
             ref={provided.innerRef} 
            {...provided.draggableProps} 
            {...provided.dragHandleProps} 
           
           
            
            
            > 
    
        { props.onList &&

          <small className="order">{props.index + 1}</small>
         }
  
        
          
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