import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    headerHeading:"",

}

const headerSlice = createSlice({
    name:"header",
    initialState,
    reducers:{
        setHeaderHeading : (state,action)=>{
            state.headerHeading = action.payload
        }
    }
})

export default headerSlice.reducer;

export const {
    setHeaderHeading
} = headerSlice.actions