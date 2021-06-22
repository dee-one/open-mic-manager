import { createSlice } from "@reduxjs/toolkit";



const draggingSlice = createSlice({
 name: 'draggingOver',
 initialState: {draggingOver: false},
 reducers: {
  toggleDraggingOver: (state,action) => {
    state.draggingOver = action.payload.draggingOver
  }
 }

});


export const {toggleDraggingOver} = draggingSlice.actions;
export default draggingSlice.reducer;



