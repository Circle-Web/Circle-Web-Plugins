import Axios from "axios";
import type { AxiosRequestConfig, CustomParamsSerializer, AxiosResponse, Method } from "axios";
import { stringify } from "qs";

// 相关配置请参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1
const defaultConfig: AxiosRequestConfig = {
  // 请求超时时间
  baseURL: "/api",
  timeout: 10000,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
  },
  // 数组格式参数序列化（https://github.com/axios/axios/issues/5142）
  paramsSerializer: {
    serialize: stringify as unknown as CustomParamsSerializer
  }
};

const instance = Axios.create(defaultConfig);


instance.interceptors.response.use(
  (response: AxiosResponse) => {

    if (response.data.code !== 0) {
      return Promise.reject(response.data);
    }
    return response.data;
  },
  (error) => {
    const $error = error;
    $error.isCancelRequest = Axios.isCancel($error);
    // 所有的响应异常 区分来源为取消请求/非取消请求
    return Promise.reject($error);
  }
);

/**
 * request
 * @param method 请求方法 
 * @param url 请求地址
 * @param param  请求参数
 * @returns 
 */
export const request = (method: Method, url: string, param: AxiosRequestConfig) => {
  return instance.request({
    method,
    url,
    ...param
  })
}

/**
 * get method
 * @param url  请求地址
 * @param params  请求参数
 * @returns 
 */
export const get = (url: string, params: Record<string, any>) => {
  return request("get", url, { params });
}

/**
 * post method
 * @param url  请求地址
 * @param data  请求参数
 * @returns 
 */
export const post = (url: string, data: Record<string, any>) => {
  return request("post", url, { data });
}