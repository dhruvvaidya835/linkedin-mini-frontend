import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend URL
  withCredentials: true,
});

export default instance;
