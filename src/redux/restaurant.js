import { createSlice } from "@reduxjs/toolkit";

const restaurant = JSON.parse(localStorage.getItem("restaurant"));
const initialState = restaurant ? restaurant : null;

const messageSlice = createSlice({
    name: "restaurant",
    initialState,
    reducers: {
        setRestaurant: (state, action) => {
            return action.payload;
        }
    },
});

const { reducer, actions } = messageSlice;

export const { setRestaurant } = actions
export default reducer;