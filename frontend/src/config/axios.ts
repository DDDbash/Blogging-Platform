import { ACCESS_TOKEN, API_URL } from "@/utils/constants";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";

const API = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((request) => {
  const accessToken = Cookies.get(ACCESS_TOKEN);

  if (accessToken && request.headers && !request.headers["Authorization"]) {
    request.headers["Authorization"] = `Bearer ${accessToken}`;
    return request;
  }

  return request;
});

API.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    const statusCode = error.response?.status;

    if (statusCode === 401) {
      Cookies.remove(ACCESS_TOKEN);
      window.location.replace("/");
    }

    return Promise.reject(error);
  },
);

const get = <T>(url: string, config?: AxiosRequestConfig<any>) => {
  return API.get<T>(url, config);
};

const post = <T>(url: string, body?: any, config?: AxiosRequestConfig<any>) => {
  return API.post<T>(url, body, config);
};

const put = <T>(url: string, body?: any, config?: AxiosRequestConfig<any>) => {
  return API.put<T>(url, body, config);
};

const patch = <T>(
  url: string,
  body?: any,
  config?: AxiosRequestConfig<any>,
) => {
  return API.patch<T>(url, body, config);
};

const del = <T>(url: string, config?: AxiosRequestConfig<any>) => {
  return API.delete<T>(url, config);
};

export { del, get, patch, post, put };
