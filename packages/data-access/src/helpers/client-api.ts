
import axios from "axios";
import { tokenInterceptor } from "./token-interceptor";

export const clientApi = axios.create({
  baseURL: process.env.PUBLIC_API_URL,
});


tokenInterceptor(clientApi);