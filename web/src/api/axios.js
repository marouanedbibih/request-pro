import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`
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