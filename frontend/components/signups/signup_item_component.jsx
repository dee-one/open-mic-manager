import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar,faMinusCircle,faAward} from "@fortawesome/free-solid-svg-icons";
import SetDurationComponent from './set_duration_component';


library.add(faStar, faMinusCircle,faAward);



 
const SignupItemComponent = (props) => {

   console.log(`item component`, props)
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
                {props.headlinerOrFeature  && !props.filledOut &&
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

        {props.firstTimer && !props.filledOut &&
          <span className='accolades'>first timer </span>
        }

        {!props.filledOut &&
         <span className='comic-points'>{props.points}</span>
        }
        
        {props.deleteButton && 
          <button className='comic-points' >
           <FontAwesomeIcon
            icon="minus-circle"
            onClick={() => props.handleOnClick({index: props.index})}
          />
          </button>
        }
       {props.filledOut &&
         <SetDurationComponent    />
       }
        
      </li>
     )}

     
    </Draggable>
    )



      }

export default SignupItemComponent;