import axios, { AxiosRequestConfig } from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APIURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((request) => {
  return request;
});

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
