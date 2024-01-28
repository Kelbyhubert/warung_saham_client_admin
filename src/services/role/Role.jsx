import { secureAxios } from '../../utils/CustomAxios/CustomAxios';


export const getAllRole = async () => {
    try {
         const config = {
            method: "GET",
            url: `/role/getAllRole`
         }
        
        const res = await secureAxios(config);
        return res;
    } catch (error) {
        return error
    }
}