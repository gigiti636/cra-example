import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./auth";
import clientReducer from "./client";
import restaurantReducer from "./restaurant";

const reducer = {
    auth: authReducer,
    client: clientReducer,
    restaurant: restaurantReducer
}

const store = configureStore({
    reducer: reducer,
    devTools: true,
})

export default store;