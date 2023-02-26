import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setAppStatusAC} from "../../app/app-reducer";
import {AxiosError} from "axios";
import {authAPI, LoginParamsType} from "../../api/cards-api";
import {errorUtils} from "../../utils/error-utils";

const initialState = {
    isLoggedIn: false
}

export const loginTC = createAsyncThunk<undefined, LoginParamsType,{
    rejectValue: {errors: Array<string>, fieldsErrors?: Array<any> }
}
    >('auth/login', async(param, thunkAPI)=>{
    thunkAPI.dispatch(setAppStatusAC({status:'loading'}))
    try {
        const res = await authAPI.login(param)
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))

    }
    catch (err) {
        // @ts-ignore
        const error: AxiosError = err
        errorUtils(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined} )
    }
})

export const logoutTC = createAsyncThunk('auth/logout', async(param, thunkAPI)=>{
    thunkAPI.dispatch(setAppStatusAC({status:'loading'}))
    try {
        const res = await authAPI.logout()
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))

    }
    catch(err: any){
        const error: AxiosError = err
        errorUtils(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({})
    }
})

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{value: boolean}>){
            state.isLoggedIn = action.payload.value
        }
    },
    extraReducers:(builder) => {
        builder.addCase(loginTC.fulfilled, (state)=>{
            state.isLoggedIn = true
        })
        builder.addCase(logoutTC.fulfilled, (state)=>{
            state.isLoggedIn = false
        })
    }
})

export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions









