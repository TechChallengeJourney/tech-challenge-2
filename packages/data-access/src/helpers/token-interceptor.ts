import { InternalAxiosRequestConfig } from "axios";
import { clientApi } from "./client-api";

export function getToken(): string | null {
    const rawToken = sessionStorage.getItem("token");
    return rawToken ? JSON.parse(rawToken) : null;
}

export function tokenInterceptor(apiInstance = clientApi) {
    apiInstance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            const token = getToken();
            if (token) {
                config.headers = config.headers ?? {};
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );
}