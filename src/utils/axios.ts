import axios from 'axios';
import Cookies from 'js-cookie';

// Create an instance of axios

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    console.log(token, ' in axios middleware');
    if (token && !config.url?.includes('/login') && !config.url?.includes('/register')) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirect to login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
