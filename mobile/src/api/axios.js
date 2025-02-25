import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import process from 'process';
// import {useStateContext} from "../context/ContextProvider";

// const spring_boot_api_url = process.env.SPRING_BOOT_API_URL;
const axiosClient = axios.create({
    baseURL: `http://192.168.100.103:8024/api`
})


axiosClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('JWT_TOKEN');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
})

axiosClient.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response && error.response.status === 401) {
    // Handle unauthorized error (e.g., clear token and redirect to login)
    AsyncStorage.removeItem('JWT_TOKEN');
    // Add your logic to redirect to login screen
  }
  // You can add more error handling logic here
  throw error;
})

export default axiosClient