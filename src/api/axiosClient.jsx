import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: 'https://phat-dat-store.azurewebsites.net',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
export const axiosFormClient = axios.create({
  baseURL: "https://phat-dat-store.azurewebsites.net",
  timeout: 10000,
  headers: {
    "Content-Type": "multipart/form-data"
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosFormClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
axiosFormClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);
axiosClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);
export default axiosClient;
