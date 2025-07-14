import axios from "axios";

//http://localhost:8080/api
export const api = axios.create({
  baseURL: process.env.PUBLIC_API_URL || "http://localhost:7000/api",
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {  
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token.replace(/"/g, "")}`;
    }
    return config;
  },
  (error) => {
    console.error("Erro na requisição:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Token inválido ou expirado. Redirecionando para login.");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;
