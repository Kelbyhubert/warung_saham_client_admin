import { redirect } from "react-router-dom";

export const getAuthToken = () => {
    return localStorage.getItem("TOKEN");
}

export const checkAuthToken = () => {
    const token = localStorage.getItem("TOKEN");

    if(!token){
        return redirect("/login");
    }

    return null;
}