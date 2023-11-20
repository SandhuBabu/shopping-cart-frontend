import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import productsReducer from "../features/productsSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        products: productsReducer,
    }
})