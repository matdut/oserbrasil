import axios from 'axios';

const api = axios.create({
   //baseURL: 'http://34.210.56.22:3333',  
 // baseURL: 'http://www.oser.app.br:21541',
   baseURL: 'http://localhost:21541',
})

export default api;