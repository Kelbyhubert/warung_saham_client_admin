import axios from 'axios';
import { getAuthToken } from '../../utils/auth/AuthUtils';

const axiosConfig = {
    baseURL: "http://localhost:8080/api/v1",
    headers: {
        'Content-Type': 'application/json',
    }
}

export const secureAxios = axios.create(axiosConfig);

secureAxios.interceptors.request.use((config) => {
    const token = getAuthToken();
    if(token){
        config.headers['Authorization'] = token;
    }
    console.log(config);
    return config;
});

export const basicAxios = axios.create(axiosConfig);
