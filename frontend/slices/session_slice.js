import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import getCSRFToken from "../util/get_token";




export const fetchCurrentUser = createAsyncThunk(
     'fetchCurrentUser', () => (fetch('http://localhost:3000/api/logged_in', 
     { credentials: 'include',
       headers: {'Content-Type': 'application/json',
           "Accept": "application/json",
     }
        
          })
     .then(res => res.json()))
      
);


export const adminLogin = createAsyncThunk(
    'adminLogin', (username,password) => (fetch('http://localhost:3000/api/sessions' , 
        {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
              },
            body: JSON.stringify({username,password})
         }
    
    
    
    
    )
    
       


  )




)


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
              if(action.payload.loggedIn){
                  state['currentUser'] = action.payload.user.data 
              }
                state['loggedIn'] = action.payload.loggedIn
            }

    
    }

});

export const {receiveLogin} = sessionSlice.actions;
export default sessionSlice.reducer;

