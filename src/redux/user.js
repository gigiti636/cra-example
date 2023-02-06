import { createSlice } from "@reduxjs/toolkit";


const initialUser = {
    id: null,
    email: '',
    password: '',
    name: '',
    role: '',
    avatar: ''
};


const initialState =  JSON.parse(localStorage.getItem('userStore')) ? JSON.parse(localStorage.getItem('userStore')) : initialUser;

const messageSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            return action.payload;
        }
    },
});

const { reducer, actions } = messageSlice;

export const { setUser } = actions
export default reducer;