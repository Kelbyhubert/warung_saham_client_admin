import { createSlice } from "@reduxjs/toolkit";
import { loginAction } from "../actions/AuthActions";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLogin: false,
        user: null,
        message: "",
    },
    reducers: {
        authenticated: (state,actions) => {
            console.log(actions.payload);
            state.isLogin = true;
            state.user = actions.payload;
        },
        logout: (state) => {
            state.isLogin = false;
            state.user = null;
            state.message = ""
        }
    },
    extraReducers(builder) {
        builder
            .addCase(loginAction.fulfilled, (state, action) => {
                console.log("success")
                state.isLogin = true;
                state.user = action.payload.user;
                state.message = "";
            })
            .addCase(loginAction.rejected, (state) => {
                console.log("fail")
                state.isLogin = false;
                state.user = null;
                state.message = "Invalid username or password";
            })
    }
});


export const {login, logout,authenticated} = authSlice.actions;

export default authSlice.reducer;