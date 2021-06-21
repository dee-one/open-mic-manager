
import React from 'react';
import { Droppable,DragDropContext,Draggable } from 'react-beautiful-dnd';

import SignupItemComponent from './signup_item_component';
import {NavLink} from 'react-router-dom';







class SignUps extends React.Component {
  constructor(props){
    super(props)
 
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
    overflow: isDraggingOver ? 'hidden' : 'scroll',
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
    const comic = this.props.filledOut ? this.props.list.list[draggableId] : this.props.signups[draggableId];
     
    const payload = {oldIndex: source.index ,newIndex: destination.index ,comic}
   if(source.droppableId === 'droppable1' && destination.droppableId === 'droppable1') {
     !this.props.filledOut ? this.props.reorderSignups(payload) : this.props.reorderList(payload);
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

  getListStyle = isDraggingOver => {
    
    return (
      {
      
    // display: isDraggingOver ? 'flex' : 'grid',
    background: isDraggingOver ? 	'#E8E8E8' : 'white',
    width: isDraggingOver ? '90vw' : '80vw',
    height: isDraggingOver ? '50vh' : '30vh'
      }
    )
  };
 
handleClassName = () => (
 !this.props.filledOut ? 'create-list-container' : 'finish-list-container'
 

)


render(){
  
 if(this.props.isLoading || !this.props.signups || !this.props.list.list) {
   
  return (<div className="lds-dual-ring"></div>);
 }
  
 return ( 
  
   <DragDropContext
     onDragEnd={this.onDragEnd}
     

   >
     <NavLink to='/' >
       
     </NavLink>

     
   <div className={this.handleClassName()}>
       
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
               onList={this.props.filledOut? true : null}
               filledOut={this.props.filledOut}
               droppableId={this.props.columnId}
              >
               
               </SignupItemComponent>
           
           ))}
           {provided.placeholder}
         </ul>

     )}
      
     </Droppable>

     
       <div className='swap-lists'>
         {this.props.filledOut &&
            
           
          <button onClick={e => this.handleToggle()}>Go Back </button>

         }
         {this.props.filledOut &&


           <button> Start Show </button>

         }


         {!this.props.filledOut &&
          <button onClick={e => this.handleToggle()}>Finalize List</button>
         }
       
       </div>
       
      {!this.props.filledOut &&
       <Droppable droppableId="droppable2">
         {(provided, snapshot) => (
           <ul 
             {...provided.droppableProps} 
             ref={provided.innerRef}
             style={this.getListStyle(snapshot.isDraggingOver)}
             className="final-list"
            
             >
              <span className='list-box-text'><h2>drag comics to create list </h2></span>
             {this.props.list.list.map((comic, index) => (
               <SignupItemComponent
                 index={index}
                 id={this.props.signups.length + index}
                 firstName={comic.attributes.first_name}
                 lastName={comic.attributes.last_name}
                 droppableId={this.props}
                 key={Math.random()}
                 handleOnClick={this.handleOnClick}
                 toggleFilledOut={this.toggleFilledOut}
                 deleteButton={true}
                
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