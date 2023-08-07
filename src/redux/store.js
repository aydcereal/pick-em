import { configureStore, createSlice } from "@reduxjs/toolkit"


const initialState = {
    showAlert: false,
    shouldHide: true,
    flyoutHide: true
};


const slice = createSlice({
    name: "root", 
    initialState, 
    reducers: {
        setShowAlert: (state, action) => {
            state.showAlert = action.payload
        },
        setShouldHide: (state, action) => {
            state.shouldHide = action.payload
        },
        setFlyoutHide: (state, action) => {
            state.flyoutHide = action.payload
        }
    }
})


export const {setShowAlert, setShouldHide, setFlyoutHide} = slice.actions;

const store = configureStore({
    reducer: slice.reducer
})


export default store

