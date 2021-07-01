
import React from 'react';
import { Droppable,DragDropContext} from 'react-beautiful-dnd';
import {NavLink} from 'react-router-dom';
import ListComponent from '../list/list_component';







class SignUps extends React.Component {
  constructor(props){
    super(props);
   
  }





componentDidMount(){
 
  if(this.props.signups === undefined){
    this.props.toggleLoading()
    this.props.fetchSignups()
    .then(this.props.toggleLoading());
   }

  if (this.props.list.list === undefined) {
    this.props.toggleLoading()
    this.props.fetchList()
      .then(this.props.toggleLoading());
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

 
 
handleClassName = () => (
 !this.props.filledOut ? 'create-list-container' : 'finish-list-container'
 

)


handleStartShow = () => {
  
 this.props.postList(this.props.list.list)
 .then(list => this.props.receiveList(list))
 .then(() => this.props.history.replace('/admin/showtime'))

}




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
      
     {(provided,snapshot) => (
         <ListComponent  
           className={"rough-draft" }
           innerRef={provided.innerRef} 
           provided={provided} 
           signupsOrList={this.signupsOrList()} 
           filledOut={this.props.filledOut}
           isDraggingOver={snapshot.isDraggingOver}
           
           >
         
          
         </ListComponent>

     )}
      
     </Droppable>

     
       <div className='swap-lists'>
         {this.props.filledOut &&
            
           
          <button onClick={e => this.handleToggle()}>Go Back </button>

         }
         {this.props.filledOut &&


           <button onClick={() => this.handleStartShow()} > Start Show </button>

         }


         {!this.props.filledOut &&
          <button onClick={e => this.handleToggle()}>Finalize List</button>
         }
       
       </div>
       
      {!this.props.filledOut &&
       <Droppable droppableId="droppable2">
         {(provided, snapshot) => (
         
           <ListComponent
             className="final-list"
             innerRef={provided.innerRef}
             provided={provided}
             list={this.props.list.list}
             filledOut={this.props.filledOut}
             isDraggingOver={snapshot.isDraggingOver}
             signups={this.props.signups}
             handleOnClick={this.handleOnClick}
             filledOut={this.props.filledOut}
           >


           </ListComponent>



         )}
       </Droppable>
      
      }
      </div>
   </DragDropContext>
  )
}

}
export default SignUps;