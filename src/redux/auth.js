import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage, setLoader, unsetLoader } from "./client";
import {setRestaurant} from "./restaurant";
import api, {setToken,setStore} from '../myrestaurant-client-api';


export const login = createAsyncThunk(
    "auth/login",
    async (data, thunkAPI) => {
        const navigate = data.history
        delete data['history'];
        thunkAPI.dispatch(setLoader());
        try {
            const response = await api.post('/login',  data)
            if (typeof response === 'string') {
                thunkAPI.dispatch(setMessage(response));
            }else{
                localStorage.setItem('auth',JSON.stringify(response.data))
                localStorage.setItem('restaurant',JSON.stringify(response.data.user.restaurant))
                thunkAPI.dispatch(setRestaurant(response.data.user.restaurant));
                setStore(response.data.user.default_restaurant_id);
                setToken(response.data.token);
                navigate('/');
                return response.data
            }
        } catch (error) {
            return thunkAPI.rejectWithValue();
        }finally {
            thunkAPI.dispatch(unsetLoader());
        }
    }
);


const auth = JSON.parse(localStorage.getItem("auth"));
const initialState = auth

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