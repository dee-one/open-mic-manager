import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";





export const fetchList = createAsyncThunk(
    'fetchList', () => (fetch('http://localhost:3000/api/list',
       {'credentials': 'include'
        })
        .then(res => res.json()))
);




export const listSlice = createSlice({
 name: 'list',
 initialState: {filledOut: false},
 reducers: {
    reorderList: (state, action) => {
      state.list.splice(action.payload.oldIndex, 1)
       state.list.splice(action.payload.newIndex, 0, action.payload.list)
        },
     receiveList: (state, action) => {
         state['list']= action.payload.data

     },
     receiveUser: (state,action) => {
         state.list.push(action.payload)
     },
     removeListItem: (state,action) => {
         state.list.splice(action.payload.index,1)

     },
     toggleFilledOut: (state) => {
         state.filledOut = !state.filledOut
     }

    },
    
    extraReducers: {
        [fetchList.fulfilled]: (state, action) => {

            state['list'] = action.payload.data
        }
    }


})


export const { receiveUser,removeListItem,toggleFilledOut} = listSlice.actions;
export default listSlice.reducer;