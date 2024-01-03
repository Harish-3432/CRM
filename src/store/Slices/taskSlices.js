import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {addTaskk, getTask } from "../../Services/Services"; 

const initialState = {
    task:[],
    loading:false,
    error:false
}

export const fetchTask = createAsyncThunk("user/fetchTask", async(data, { getState })=>{
    const response = await getTask().then((res)=>{
        const {data} = res;
        return(
            data
        )
    }).catch((err)=>{
        toast.error("something went wrong",{timeOut:5000});      
    })
    return response;    
});

export const addTask = createAsyncThunk('user/addTask', async (data, { getState }) =>{
    console.log("data for add task" , data);
    const response = await addTaskk(data).then((res)=>{
    }).catch((err)=>{
    toast.error('Something went wrong', { timeOut: 5000 });
    })
    return response;
   })


const taskSlice = createSlice({
    name:"taskSlice",
    initialState,
    reducers:{

    },
    extraReducers:{
        [fetchTask.fulfilled]:(state, action)=>{
            state.task = action.payload.data
            state.loading = false
        },
        [fetchTask.rejected]:(state,_)=>{
            state.task = []
            state.loading = false
        },
        [fetchTask.pending]:(state,_)=>{
            state.task = []
            state.loading = true
        }

    }
})

export default taskSlice.reducer;