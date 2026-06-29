import axios from "axios";
import store from "../LIB/Store";

export const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_BaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

apiInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
