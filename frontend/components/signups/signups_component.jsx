
import React from 'react';
import { Droppable,DragDropContext,Draggable } from 'react-beautiful-dnd';

import SignupItemComponent from './signup_item_component';
import {NavLink} from 'react-router-dom';






class SignUps extends React.Component {
  constructor(props){
    super(props)
   
  }





componentDidMount(){
  console.log('rendering')
  if(Object.keys(this.props.comics).length === 0){
    this.props.toggleLoading()
    this.props.fetchSignups()
    .then(this.props.toggleLoading())
   }
}


  onDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      
      return;
    }
    const payload = {oldIndex: source.index ,newIndex: destination.index ,comic: this.props.comics.comics[draggableId] }
    this.props.reorderSignups(payload);
  }




render(){
 
 if(this.props.isLoading || !this.props.comics.comics) {
   
  return (<div className="lds-dual-ring"></div>);
 }
  
 return ( 
  
   <DragDropContext
     onDragEnd={this.onDragEnd}

   >
     <NavLink to='/' >
       mic
     </NavLink>

     <h2 className='Header-title'>Signups</h2>
   <div className="sign-ups">
       
     <Droppable droppableId='dp1'>
      
     {(provided) => (
         <ul {...provided.droppableProps} ref={provided.innerRef}>
           {this.props.comics.comics.map((comic,index) => (
             <SignupItemComponent 
               index={index}
               id={index.toString()}  
               firstName={comic.attributes.first_name} 
               lastName={comic.attributes.last_name} 
               points={comic.attributes.points} 
               key={Math.random()}
               firstTimer= {comic.attributes.first_timer}
               headlinerOrFeature = {comic.attributes.headliner_or_feature}
              >
               
               </SignupItemComponent>
           
           ))}
           {provided.placeholder}
         </ul>

     )}
      
     </Droppable>
   </div>
   </DragDropContext>
  )
}







}








export default SignUps;