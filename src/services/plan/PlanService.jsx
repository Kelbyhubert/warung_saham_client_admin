import { secureAxios } from '../../utils/CustomAxios/CustomAxios';

export const getAllPlan = async () => {
    try {
         const config = {
            method: "GET",
            url: `/plan`,
         }
        
        const res = await secureAxios(config);
        return res;
    } catch (error) {
        return error
    }
}