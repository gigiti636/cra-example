import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    error_message: '',
    loader: false,
};

const messageSlice = createSlice({
    name: "client",
    initialState,
    reducers: {
        setMessage: (state, action) => {
            state.error_message = action.payload;
        },
        clearMessage: (state) => {
            state.error_message = '';
        },
        setLoader: (state) => {
            state.loader = true;
        },
        unsetLoader: (state) => {
            state.loader = false;
        },
    }
});

const { reducer, actions } = messageSlice;

export const { setMessage, clearMessage,setLoader, unsetLoader } = actions
export default reducer;