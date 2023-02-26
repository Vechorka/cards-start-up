import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { authAPI } from "../api/cards-api";
import {setIsLoggedInAC} from "../components/Login/auth-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    status: RequestStatusType,
    error: string | null,
    isInitialized: boolean
}

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const initializeAppTC = createAsyncThunk('app/initialize', async(param,{dispatch})=>{
    const res = await authAPI.me()
    dispatch(setIsLoggedInAC({value: true}))

})


const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers:{
        setAppErrorAC: (state, action: PayloadAction<{error: string | null}>) => {
            state.error = action.payload.error
        },
        setAppStatusAC: (state, action: PayloadAction<{status: RequestStatusType}>) => {
            state.status = action.payload.status
        }
    },
    extraReducers: builder => {
        builder.addCase(initializeAppTC.fulfilled, (state) => {
            state.isInitialized = true
        })
    }
})

export const appReducer = slice.reducer
export const {setAppStatusAC, setAppErrorAC} = slice.actions





