import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";





export const fetchList = createAsyncThunk(
    'fetchList', () => (fetch('http://localhost:3000/api/list',
       {'credentials': 'include'
        })
        .then(res => res.json()))
);




export const listSlice = createSlice({
 name: 'list',
 initialState: {},
 reducers: {
    reorderList: (state, action) => {
      state.list.splice(action.payload.oldIndex, 1)
       state.list.splice(action.payload.newIndex, 0, action.payload.list)
        },
     receiveList: (state, action) => {
         state = action.payload.data

     }

    },
    
    extraReducers: {
        [fetchList.fulfilled]: (state, action) => {

            state['list'] = action.payload.data
        }
    }


})



export default listSlice.reducer;