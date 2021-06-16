import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";





function getCSRFToken() {
    return unescape(document.cookie.split('=')[1])
}



export const fetchCurrentUser = createAsyncThunk(
     'fetchCurrentUser', () => (fetch('http://localhost:3000/api/logged_in', 
     { credentials: 'include',
       headers: {'Content-Type': 'application/json',
           "Accept": "application/json",
     }
        
          })
     .then(res => res.json()))
      /*    
       'fetchCookies', () => (fetch('http://localhost:3000/'),
         { credentials: 'include'}
       )
       .then(res => res.json())
        */

);


export const sessionSlice = createSlice({
    name: 'session',
    initialState: {},
    reducers: {
        receiveLogin: (state, action) => {
            state['currentUser'] = action.payload.currentUser
        }
    },
        extraReducers: {
            [fetchCurrentUser.fulfilled]: (state, action) => {
            // state['currentUser'] = action.payload.data.loggedIn
            //   state['token'] = action.payload.data.csrfToken
              if(action.payload.loggedIn){
                  state['currentUser'] = action.payload.user.data 
              }
                state['loggedIn'] = action.payload.loggedIn
            }

    
    }

});

export const {receiveLogin} = sessionSlice.actions;
export default sessionSlice.reducer;

