import { secureAxios } from '../../utils/CustomAxios/CustomAxios';


export const getAllUser = async (pageIndex, size) => {
    try {
         const config = {
            method: "GET",
            url: `/user?pageIndex=${pageIndex}&size=${size}`,
         }
        
        const res = await secureAxios(config);
        return res;
    } catch (error) {
        return error
    }
}

export const getUserByUserId = async (userId) => {
    try {
        const config = {
            method: "GET",
            url: `/user/${userId}`,
         }
        
        const res = await secureAxios(config);
        return res;
    } catch (error) {
        return error;
    }
}

export const addNewUser = async (user) => {
    try {
        const config = {
            method: "POST",
            url: `/user/add-user`,
            data: user,
         }
        
        const res = await secureAxios(config);
        return res;
    } catch (error) {
        return error;
    }
}