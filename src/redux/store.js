import { configureStore, createSlice } from "@reduxjs/toolkit"


const initialState = {
    showAlert: false,
    shouldHideAlert: true,
    
};


const slice = createSlice({
    name: "root", 
    initialState, 
    reducers: {
        setShowAlert: (state, action) => {
            state.showAlert = action.payload
        },
        setShouldHideAlert: (state, action) => {
            state.shouldHideAlert = action.payload
        },
        
    }
})


export const {setShowAlert, setShouldHideAlert} = slice.actions;

const store = configureStore({
    reducer: slice.reducer
})


export default store

