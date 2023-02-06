import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./auth";
import clientReducer from "./client";
import userReducer from "./user";

const reducer = {
    auth: authReducer,
    client: clientReducer,
    user: userReducer
}

const store = configureStore({
    reducer: reducer,
    devTools: true,
})

export default store;