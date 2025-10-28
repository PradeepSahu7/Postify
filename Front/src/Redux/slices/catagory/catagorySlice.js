import {createSlice,createAsyncThunk, isRejectedWithValue} from "@reduxjs/toolkit"
import { resetErrorAction, resetSuccessAction } from "../globalSlice/globalSlice";
import axios from "axios"

const INITIAL_STATE= {
    loading:false,
    error:null,
    success:false,
    catagories:[],
    catagory:null, 
};

export const fetchCatagoriesActions = createAsyncThunk("catagories/lists",async(payload,{rejectWithValue})=>{
    try {
        const res = await axios.get("/api/v1/categories",payload)
        return res.data;
    } catch (error) {
        return  rejectWithValue(error?.response?.data);
    }
})

const catagorySlice = createSlice({
    name:"catagory",
    initialState:INITIAL_STATE,
    extraReducers:(builder)=>{
        builder.addCase(fetchCatagoriesActions.pending,(state,action)=>{
            state.loading= true
        })

        builder.addCase(fetchCatagoriesActions.fulfilled,(state,action)=>{
        
            state.loading = false;
            state.error = null;
            state.success = true;
            state.catagories = action.payload;
            console.log(state.catagories);
            
        });
        builder.addCase(fetchCatagoriesActions.rejected,(state,action)=>{
                 
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        });
    }
})

const catagoyReducer = catagorySlice.reducer;

export default catagoyReducer;