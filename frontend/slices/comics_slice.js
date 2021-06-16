

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";





export const fetchSignups =  createAsyncThunk(
  'fetchSignups', () => (fetch('http://localhost:3000/api/users')
      .then(res => res.json()))
);




export const comicsSlice = createSlice({
    name: 'comics',
    initialState: {},
    reducers: {
     reorderSignups: (state,action) => {
            state.comics.splice(action.payload.oldIndex,1)
            state.comics.splice(action.payload.newIndex, 0, action.payload.comic)
         },
         receiveSignups: (state, action) => {
           state = action.payload.comics

         },
        },
        extraReducers: {
          [fetchSignups.fulfilled]: (state,action) => {
              
              state['comics'] = action.payload.data
          }

        }
    
});

 
export default comicsSlice.reducer;