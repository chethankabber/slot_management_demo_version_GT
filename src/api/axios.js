import axios from "axios";  //Axios is a library to make HTTP requests

const api = axios.create({              //Create Axios instance
  baseURL: "http://192.168.100.33:8000/api",  //   //192.168.100.33:8000
});

api.interceptors.request.use((config) => {     //An interceptor is a function that runs:Before every request is sent /Every request goes through here first.

  const token = localStorage.getItem("token");   //Stored in browser memory. and retrieved when needed.
 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("🚀 Sending Token:", token);
    console.log("📌 Authorization Header:", config.headers.Authorization);
  }
  
  return config;                                 //If you don’t return config: Request will never be sent / App will break / 
});                                              //this  config contain all the request details (URL, method, headers, data)

export default api;
