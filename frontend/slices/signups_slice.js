

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";





export const fetchSignups =  createAsyncThunk(
  'fetchSignups', () => (fetch('http://localhost:3000/api/users')
      .then(res => res.json()))
);




export const signupsSlice = createSlice({
    name: 'signups',
    initialState: {},
    reducers: {
     reorderSignups: (state,action) => {
            state.signups.splice(action.payload.oldIndex,1)
            state.signups.splice(action.payload.newIndex, 0, action.payload.comic)
         },
         receiveSignups: (state, action) => {
           state = action.payload.comics

         },
         removeUser: (state, action) => {
           state.signups.splice(action.payload, 1)
             console.log(action.payload);
         },
         receiveSignup: (state,action) => {
            console.log('action', action)
            console.log('state',state)
           state.signups.push(action.payload.signup)
         }

        },
        extraReducers: {
          [fetchSignups.fulfilled]: (state,action) => {
              
              state['signups']= action.payload.data
          }

        }
    
});

 export const {removeUser,receiveSignup} = signupsSlice.actions;
export default signupsSlice.reducer;