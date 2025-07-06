import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

const axiosParams: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
  },
};

const axiosInstance = axios.create(axiosParams);

const api = (axios: AxiosInstance) => {
  return {
    get: <T>(url: string, config: AxiosRequestConfig = {}) => axios.get<T>(url, config),
    delete: <T>(url: string, config: AxiosRequestConfig = {}) => axios.delete<T>(url, config),
    post: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) => axios.post<T>(url, body, config),
    patch: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) => axios.patch<T>(url, body, config),
    put: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) => axios.put<T>(url, body, config),
  };
};

export default api(axiosInstance);
