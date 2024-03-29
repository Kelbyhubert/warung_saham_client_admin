import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice/AuthSlice";

export default configureStore({
    reducer:{
        auth: authReducer
    }
});