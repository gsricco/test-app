import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {authUserApi} from "../../api/authUserApi";


export const authUser = createAsyncThunk('auth/authUser', async (param, thunkAPI) => {
    try {
        const res = await authUserApi.authUser();
        localStorage.setItem('access_token', res.data.access_token)
        thunkAPI.dispatch(setUserToken({access_token: res.data.access_token}))
        return {access_token: res.data.access_token};
    } catch (err) {
        const error: AxiosError = err as AxiosError;
        return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})
export const asyncAction = {
    authUser,
}
export const slice = createSlice({
    name: 'auth',
    initialState: {
        access_token: '',
    },
    reducers: {
        setUserToken(state, action: PayloadAction<{ access_token: string }>) {
            state.access_token = action.payload.access_token
        },
    },
})

export const auth = slice.reducer;

export const {
    setUserToken,
} = slice.actions

