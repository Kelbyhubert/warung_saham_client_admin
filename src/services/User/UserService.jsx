import { secureAxios } from '../../utils/CustomAxios/CustomAxios';

export const getAllUser = async (pageIndex, size) => {
    try {
         const config = {
            method: "GET",
            url: `/user?pageIndex=${pageIndex}&size=${size}&username=`,
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

export const createUserPremium = async (userId,newPremium) => {
    let formData = new FormData();
    formData.append("planId", newPremium.planId);
    formData.append("image",newPremium.img);
    formData.append("paymentType",newPremium.paymentType);

    try {
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            url: `/premium/${userId}/create`,
            data: formData,
         }
        
        const res = await secureAxios(config);
        return res;
    } catch (error) {
        console.error(error);
    }
}