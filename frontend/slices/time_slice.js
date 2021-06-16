import { createSlice } from "@reduxjs/toolkit";


const timeSlice = createSlice({
 name: 'time',
 initialState: {minutes: 0, seconds: 58, isRunning: false},
 reducers: {
  incrementSeconds: (state, action) => {
   state['seconds'] = state.seconds + 1
   },
     incrementMinutes: (state, action) => {
         state['seconds'] = 0;
         state['minutes'] = state['minutes'] + 1;
     },
   toggleRunning: (state) => {
       state['isRunning'] = !state.isRunning
       },
    resetTime: (state) => {
     state['seconds'] = 0;
     state['minutes'] = 0;

    },
    receiveTime: (state,action) => {
     state['minutes'] = action.payload.time.minutes;
     state['seconds'] = action.payload.time.seconds;
    }

    
  } 

 








})

window.actions = timeSlice.actions;

export const { incrementSeconds,incrementMinutes,resetTime,toggleRunning,receiveTime } = timeSlice.actions;
export default timeSlice.reducer;