import axios from 'axios';

const api = axios.create({
  baseURL: 'http://35.198.17.69/api',
});

export default api;
