import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import getCSRFToken from "../util/get_token";







export const fetchList = createAsyncThunk(
    'fetchList', () => (fetch('http://localhost:3000/api/list',
       {'credentials': 'include'
        })
        .then(res => res.json()))
);

export const postList = createAsyncThunk(
    'postList', (list) => (fetch('http://localhost:3000/api/list',
        {
            method: 'POST',
            'credentials': 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': getCSRFToken()
            },
            body: JSON.stringify({list})
        })
        .then(res => res.json()))
);


export const updateOnStage = createAsyncThunk(
    'updateOnStage', (_,{ getState }) => {
         const onStageId  = getState().list.list[getState().list.currentlyPeformingIndex].attributes.id;
        fetch('http://localhost:3000/api/list/update_onstage_id',
        {
            method: 'PUT',
            'credentials': 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': getCSRFToken()
            },
            body: JSON.stringify({onStageId})
        })
        .then(res => res.json())}
);


export const getCurrrentlyPeformingIndex = createAsyncThunk(
    'getCurrentlyPeformingIndex', () => (fetch('http://localhost:3000/api/list/currentlyPeformingIndex',
        {
            'credentials': 'include'
        })
        .then(res => res.json()))
);



export const listSlice = createSlice({
 name: 'list',
 initialState: {filledOut: false,completedSet: [], currentlyPeformingIndex: 0},
 reducers: {
    reorderList: (state, action) => {
        
       state.list.splice(action.payload.oldIndex, 1);
       state.list.splice(action.payload.newIndex, 0, action.payload.comic);
        },
     receiveList: (state, action) => {
         
         state.list = action.payload.payload.data;

     },
     receiveUser: (state,action) => {
         
         state.list.push(action.payload);
     },
     removeListItem: (state,action) => {
         state.list.splice(action.payload.index,1);

     },
     toggleFilledOut: (state) => {
         state.filledOut = !state.filledOut;
     },
     updateSetDuration: (state,action) => {
         state.list[action.payload.id].attributes.set_duration = parseInt(action.payload.setDuration);
     },
     nextComic: (state,action) => {
         state.list[state.currentlyPeformingIndex].attributes.set_complete = true;
         state.currentlyPeformingIndex++;
     },
     prevComic: (state,action) => {
         
     state.list[state.currentlyPeformingIndex].attributes.set_complete = false;
         state.list[state.currentlyPeformingIndex-1].attributes.set_complete = false
        state.currentlyPeformingIndex--

     },
     updateList: (state, action) => {
         state.list = action.payload.list;

     },
     receiveCurrentlyPeformingIndex: (state,action) => {
       state.currentlyPeformingIndex = action.payload.currentIndex;
     },

     
     
      

    },
    
    extraReducers: {
        [fetchList.fulfilled]: (state, action) => {

            state.list = action.payload.data;
        },
        [getCurrrentlyPeformingIndex.fulfilled]: (state,action) => {
            console.log(action)
          state.currentlyPeformingIndex = action.payload.currentlyPeformingIndex;

        }
    }


})


export const { receiveUser,removeListItem,toggleFilledOut,reorderList, updateSetDuration,nextComic,prevComic,updateList,receiveList,receiveCurrentlyPeformingIndex} = listSlice.actions;
export default listSlice.reducer;