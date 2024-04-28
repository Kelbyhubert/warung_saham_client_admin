import { secureAxios } from '../../utils/CustomAxios/CustomAxios';

export const getAllRekom = async (pageIndex, size, filter) => {

    const filterData = {
        code: filter?.code || '',
        fromDate : filter?.fromDate || '',
        endDate : filter?.endDate || '',
    };
    try {
         const config = {
            method: "GET",
            url: `/rekom`,
            params: {
                index: pageIndex,
                size: size,
                code: filterData.code,
                fromDate: filterData.fromDate,
                endDate: filterData.endDate
            }
         }
        
        const res = await secureAxios(config);
        return res;
    } catch (error) {
        console.error(error);
    }
}

export const getRekomDetailById = async (id) => {
    try {
         const config = {
            method: "GET",
            url: `/rekom/${id}`,
         }
         
        const res = await secureAxios(config);
        return res;
    } catch (error) {
        console.error(error);
    }
}

export const createRekom = async (rekom) => {
    try {
        const config = {
            method: "POST",
            url: `rekom/create`,
            data: rekom
         }
         
        const res = await secureAxios(config);
        return res;
    }catch(error){
        console.error(error);
    }
}

export const updateRekom = async (rekomId, rekom) => {
    try {
        const config = {
            method: "PUT",
            url: `rekom/${rekomId}/update`,
            data: rekom
         }
         
        const res = await secureAxios(config);
        return res;
    }catch(error){
        console.error(error);
    }
}

export const deleteRekom = async (rekomId) => {
    try {
        const config = {
            method: "DELETE",
            url: `rekom/${rekomId}`,
         }
         
        const res = await secureAxios(config);
        return res;
    }catch(error){
        console.error(error);
    }
}