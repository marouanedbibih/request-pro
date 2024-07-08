import axios from "axios";
// import process from 'process';
// import {useStateContext} from "../context/ContextProvider";

// const spring_boot_api_url = process.env.SPRING_BOOT_API_URL;
const axiosClient = axios.create({
    baseURL: `http://localhost:8024/api`
})


axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('JWT_TOKEN');
    if (token != null) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

axiosClient.interceptors.response.use((response) => {
  return response
}, (error) => {
  const {response} = error;
  if (response.status === 401) {
    localStorage.removeItem('JWT_TOKEN')
    // window.location.reload();
  } else if (response.status === 404) {
    //Show not found
  }

  throw error;
})

export default axiosClient