import axios from 'axios';
import {getToken} from './auth';

const api = axios.create({
   //baseURL: 'http://34.210.56.22:3333',  
  //  baseURL: 'http://www.oser.app.br:21541', 
  baseURL: 'http://localhost:21541',
});

/*
api.interceptors.request.use(async config =>{
   const token = getToken();
   if (token) {
      config.headers.Authorization = `Bearer ${token}`
   }

   return config;
})
*/

export default api;