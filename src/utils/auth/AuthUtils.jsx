import jwtDecode from "jwt-decode";
import { redirect } from "react-router-dom";
import { authenticated, logout } from "../../redux/auth/slice/AuthSlice";


export const getAuthToken = () => {
    return localStorage.getItem("TOKEN");
}

export const checkAuthToken = (dispatch) => () => {

    const token = localStorage.getItem("TOKEN");
    if(!token){
        return redirect("/login");
    }

    const data = jwtDecode(token);

    if(Date.now() >= data.exp * 1000){
        dispatch(logout());
        return redirect("/login");
    }

    dispatch(authenticated(data.user));

    return null;
}