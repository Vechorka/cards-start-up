
import {RequestStatusType, setAppStatusAC} from "../../app/app-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";



const initialState = {

}

export const fetchProfileTC = createAsyncThunk('profile/fetchProfile', async(param, {dispatch, rejectWithValue})=>{

})

const slice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
    },
    extraReducers:builder => {
        builder.addCase(fetchProfileTC.fulfilled, ((state, action)=>{
        }))
    }
})





export const profileReducer = slice.reducer