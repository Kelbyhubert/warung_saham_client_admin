import { secureAxios } from '../../utils/CustomAxios/CustomAxios';

export const getStockDetailByCode = async (stockCode) => {
    try {
        const config = {
           method: "GET",
           url: `/stock/${stockCode}`,
        }
       
       const res = await secureAxios(config);
       return res;
   } catch (error) {
       console.error(error);
       return error.response;
   }
}


export const getStockList = async (stockCode) => {
    try {
         const config = {
            method: "GET",
            url: `/stock/list?stockCodeContain=${stockCode}`,
         }
        
        const res = await secureAxios(config);
        return res;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}

export const getStockListPage = async (index,size,search,filter) => {
    try {
        const config = {
           method: "GET",
           url: `/stock/pageable?index=${index}&size=${size}&search=${search}&filter=${filter}`,
        }
       
       const res = await secureAxios(config);
       return res;
   } catch (error) {
       console.error(error);
       return error.response;
   }

}

export const createNewStock = async (newStock) => {
    try {
        const config = {
            method:"POST",
            url: `/stock/add`,
            data: newStock
        }

        const res = await secureAxios(config);
        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
}