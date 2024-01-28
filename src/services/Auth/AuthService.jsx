import { basicAxios } from '../../utils/CustomAxios/CustomAxios';

export const authenticate = async (username, password) => {
    try {
         const config = {
            method: "POST",
            url: '/auth/signin',
            data:{
                username: username,
                password: password
            }
         }
        
        const res = await basicAxios(config);
        return res;
    } catch (error) {
        return error
    }
}