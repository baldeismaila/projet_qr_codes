import axios from "axios";

const axiosInstance = axios.create() 
// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    let configHeader = { Authorization: `Bearer ${JSON.parse(localStorage.getItem("TOKEN"))}` }
    //console.log("token header:" + configHeader.Authorization)
    config.headers = {...config.headers, ...configHeader}
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

export default axiosInstance;