import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    id: null,
    email: '',
    password: '',
    name: '',
    role: '',
    avatar: ''
};

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