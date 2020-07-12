import axios from 'axios';

const api = axios.create({
   //baseURL: 'http://34.210.56.22:3333',
   baseURL: 'http://localhost:3333',
})

export default api;