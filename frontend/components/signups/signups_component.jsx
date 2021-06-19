
import React from 'react';
import { Droppable,DragDropContext,Draggable } from 'react-beautiful-dnd';

import SignupItemComponent from './signup_item_component';
import {NavLink} from 'react-router-dom';






class SignUps extends React.Component {
  constructor(props){
    super(props)
   console.log(props);
  }





componentDidMount(){
 
  if(this.props.signups === undefined){
    this.props.toggleLoading()
    this.props.fetchSignups()
    .then(this.props.toggleLoading())
   }

  if (this.props.list.list === undefined) {
    this.props.toggleLoading()
    this.props.fetchList()
      .then(this.props.toggleLoading())
  }
}



  getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250
  });




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
    // dragging item from list 1 to a different index in list 1
    const payload = {oldIndex: source.index ,newIndex: destination.index ,comic: this.props.signups[draggableId] }
   if(source.droppableId === 'droppable1' && destination.droppableId === 'droppable1') {
     this.props.reorderSignups(payload);
    };
    // dragging item from list 1 to list 2
    if (source.droppableId === 'droppable1' && destination.droppableId === 'droppable2') {
      
      const comic = this.props.signups[draggableId];
      this.props.receiveUser(comic);
      this.props.removeUser(draggableId);
      
    };
  
  }

handleOnClick = (payload) => {
 
  this.props.receiveSignup({signup: this.props.list.list[payload.index]})
  this.props.removeListItem(payload)
  
}

signupsOrList = () => (
  this.props.filledOut ? this.props.list.list : this.props.signups
  

)

handleToggle = () => {
  this.props.toggleFilledOut()
}



render(){
  console.log(this.props)
 if(this.props.isLoading || !this.props.signups || !this.props.list.list) {
   
  return (<div className="lds-dual-ring"></div>);
 }
  
 return ( 
  
   <DragDropContext
     onDragEnd={this.onDragEnd}

   >
     <NavLink to='/' >
       
     </NavLink>

     
   <div className="create-list-container">
       
     <Droppable droppableId='droppable1'>
      
     {(provided) => (
         <ul {...provided.droppableProps} ref={provided.innerRef} className="rough-draft">
         
           {this.signupsOrList().map((comic,index) => (
             <SignupItemComponent 
               index={index}
               id={index.toString()}  
               firstName={comic.attributes.first_name} 
               lastName={comic.attributes.last_name} 
               points={comic.attributes.points} 
               key={Math.random()}
               firstTimer= {comic.attributes.first_timer}
               headlinerOrFeature = {comic.attributes.headliner_or_feature}
               handleOnClick={false}
               toggleFilledOut={this.toggleFilledOut}
              >
               
               </SignupItemComponent>
           
           ))}
           {provided.placeholder}
         </ul>

     )}
      
     </Droppable>

     
       <div className='swap-lists'><button onClick={e => this.handleToggle()}>Finalize List</button></div>
       
      {!this.props.filledOut &&
       <Droppable droppableId="droppable2">
         {(provided, snapshot) => (
           <ul {...provided.droppableProps} ref={provided.innerRef} className="final-list">
              <span className='list-box-text'><h2>drag comics to create list </h2></span>
             {this.props.list.list.map((comic, index) => (
               <SignupItemComponent
                 index={index}
                 id={this.props.signups.length + index}
                 firstName={comic.attributes.first_name}
                 lastName={comic.attributes.last_name}
                 onList={true}
                 key={Math.random()}
                 handleOnClick={this.handleOnClick}
                 toggleFilledOut={this.toggleFilledOut}
             
                 
               >
              
               </SignupItemComponent>

             ))}
             {provided.placeholder}
           </ul>
        
         )}
       </Droppable>
      
      }



      </div>
   </DragDropContext>
  )
}







}








export default SignUps;