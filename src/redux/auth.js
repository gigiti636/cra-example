import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage, setLoader, unsetLoader } from "./client";
import {setUser} from "./user";
import api, {setToken} from '../api-client';


export const login = createAsyncThunk(
    "auth/login",
    async (data, thunkAPI) => {
        const navigate = data.history
        delete data['history'];
        thunkAPI.dispatch(setLoader());
        try {
            const response_auth = await api.post('/auth/login',  data);
            const {access_token, refresh_token} = response_auth.data;
            setToken(access_token);

            return response_auth.data;
        } catch (error) {
            console.log(error)
            thunkAPI.dispatch(setMessage(error.response.data.message));
            return thunkAPI.rejectWithValue();
        }finally {
            thunkAPI.dispatch(unsetLoader());

            const response_userSession = await api.get('/auth/profile');
            const userData = response_userSession.data;


            if(userData){
                navigate('/');
                thunkAPI.dispatch(setUser(userData));
            }

        }
    }
);


const initialState = {
    access_token: '',
    refresh_token: '',
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers:(builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                return action.payload;
            })
    }
});

const { reducer } = authSlice;
export default reducer;