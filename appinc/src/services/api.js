import axios from 'axios';

const api = axios.create({
  baseURL: 'http://35.231.239.168/api',
});

export default api;
