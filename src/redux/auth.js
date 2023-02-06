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
            console.log(response_auth)
            const {access_token, refresh_token} = response_auth.data;
            localStorage.setItem('authStore',JSON.stringify(response_auth.data));
            setToken(access_token);

            if(response_auth.data.status === 401)
                thunkAPI.dispatch(setMessage('Unauthorized'));
            return response_auth.data;
        } catch (error) {
            return thunkAPI.rejectWithValue();
        }finally {
            thunkAPI.dispatch(unsetLoader());

            const response_userSession = await api.get('/auth/profile');
            const userData = response_userSession.data;
            localStorage.setItem('userStore',JSON.stringify(userData));

            if(userData){
                navigate('/');
                thunkAPI.dispatch(setUser(userData));
            }

        }
    }
);


const initialAuth = {
    access_token: '',
    refresh_token: '',
};

const initialState =  JSON.parse(localStorage.getItem('authStore')) ? JSON.parse(localStorage.getItem('authStore')) : initialAuth;

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