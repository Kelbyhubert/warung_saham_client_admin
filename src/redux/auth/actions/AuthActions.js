import jwtDecode from "jwt-decode";
import { authenticate } from "../../../services/Auth/AuthService";
import { logout,authenticated } from "../slice/AuthSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginAction = createAsyncThunk(('auth/loginAction'),
    async (credential) => {

        const {username, password} = credential;
        const res = await authenticate(username,password);
        
        let payload = {
            isLogin: false,
            user: null,
            message: ""
        }

        if(res.status == 200){
            localStorage.setItem("TOKEN", `Bearer ${res.data.data.token}`);
            const data = jwtDecode(res.data.data.token);
            payload = {
                isLogin: true,
                user: data.user,
                message: ""
            }

            return payload;
        }else {
            throw new Error("Invalid Credential")
        }
    }
)

export const logoutAction = () => {
    return (dispatch) => {
        localStorage.removeItem("TOKEN");
        dispatch(logout())
    }
}

export const authAction = (user) => {
    return (dispatch) => {
        console.log("authAction");
        dispatch(authenticated(user));
    }
}