import { secureAxios } from '../../utils/CustomAxios/CustomAxios';

export const getInsightPerPage = async (index, size , filter) => {

    const filterData = {
        title: filter?.title || '',
        createBy : filter?.createBy || '',
        fromDate : filter?.fromDate || '',
        endDate : filter?.endDate || '',
    };

    try {
         const config = {
            method: "GET",
            url: `/insight`,
            params :{
                index: index,
                size: size,
                title: filterData.title,
                createBy: filterData.createBy,
                fromDate: filterData.fromDate,
                endDate: filterData.endDate
            }
         }
        
        const res = await secureAxios(config);
        return res;
    } catch (error) {
        return error
    }
}

export const getInsightDetailById = async (id) => {
    try {
        const config = {
           method: "GET",
           url: `/insight/${id}`,
        }
       
       const res = await secureAxios(config);
       return res;
   } catch (error) {
       return error
   }
}

export const createInsight = async (userId,insight) => {
    let formData = new FormData();
    formData.append("userId",userId)
    formData.append("title", insight.title);
    formData.append("thumbnailImg",insight.thumbnail);
    formData.append("content",insight.content);

    try {
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            url: `/insight/create`,
            data: formData,
         }
        
        const res = await secureAxios(config);
        return res;
    } catch (error) {
        console.error(error);
    }
}

export const updateInsight = async (userId,insight) => {
    let formData = new FormData();
    formData.append("userId",userId)
    formData.append("title", insight.title);
    
    if(insight.thumbnail !== null){
        formData.append("thumbnailImg",insight.thumbnail);
    }
    
    formData.append("content",insight.content);

    try {
        const config = {
            method: "PUT",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            url: `/insight/${insight.id}`,
            data: formData,
         }
        
        const res = await secureAxios(config);
        return res;
    } catch (error) {
        console.error(error);
    }
}