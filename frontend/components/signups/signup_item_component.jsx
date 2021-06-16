import React from 'react';
import { Draggable } from 'react-beautiful-dnd';


 
const SignupItemComponent = (props) => (
    <Draggable key={props.id} draggableId={props.id} index={props.index}>
     {(provided,snapshot) => (   
            <li className="comic-list-item" ref={provided.innerRef} 
            {...provided.draggableProps} {...provided.dragHandleProps} 
         
            
            > 
          {props.firstTimer &&
          <span className='accolades'>first timer </span>
          }
        <span>{`${props.firstName} ${props.lastName}`}</span>
                {props.headlinerOrFeature &&
                  <span className='accolades'>
                     headliner/feature 
                  </span>
                
                }
        <span>points:{props.points}</span>
      </li>
     )}
    </Draggable>



)

export default SignupItemComponent;