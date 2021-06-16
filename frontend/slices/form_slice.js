import { createSlice } from "@reduxjs/toolkit";



export const formSlice = createSlice({
    name: "form",
    initialState: {completed: false},
    reducers: {
        toggleCompleted: state => {
         const isCompleted = !state.completed;
         state.completed = isCompleted;

        }
    }



})

export const selectCompleted = state => state.form.completed;

export const { toggleCompleted } = formSlice.actions
export default formSlice.reducer;