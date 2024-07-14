import axios from "axios";

let headers = {};

const AxiosInstance = axios.create({
  
  baseURL:  "http://localhost:8080/",
  headers,
  timeout: 1000000,
});

AxiosInstance.interceptors.request.use(
  async (config) => {
    const token =null;
    if (token) {
      config.headers.Authorization = token; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

AxiosInstance.interceptors.response.use(
  response => response,
  error => {

    if (error.response) {
      const { status, data } = error.response;
      if (status === 500) {

      } else {
      }
      return Promise.reject(error.response.data);
    } else if (error.request) {
      return Promise.reject(error);
    } else {
      console.log('Error message:', error.message);
      return Promise.reject(error);
    }
  }
);

export default AxiosInstance;
