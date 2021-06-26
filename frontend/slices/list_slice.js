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

window.postList = postList;




export const listSlice = createSlice({
 name: 'list',
 initialState: {filledOut: false},
 reducers: {
    reorderList: (state, action) => {
         console.log(action.payload);
      state.list.splice(action.payload.oldIndex, 1);
       state.list.splice(action.payload.newIndex, 0, action.payload.comic);
        },
     receiveList: (state, action) => {
         state['list']= action.payload.data;

     },
     receiveUser: (state,action) => {
         
         state.list.push(action.payload)
     },
     removeListItem: (state,action) => {
         state.list.splice(action.payload.index,1);

     },
     toggleFilledOut: (state) => {
         state.filledOut = !state.filledOut;
     },
     updateSetDuration: (state,action) => {
         state.list[action.payload.id].attributes.set_duration = parseInt(action.payload.setDuration);
     }

    },
    
    extraReducers: {
        [fetchList.fulfilled]: (state, action) => {

            state['list'] = action.payload.data;
        }
    }


})


export const { receiveUser,removeListItem,toggleFilledOut,reorderList, updateSetDuration} = listSlice.actions;
export default listSlice.reducer;