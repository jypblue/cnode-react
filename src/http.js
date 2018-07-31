import axios from 'axios';
import qs from 'qs';
import config from './config';

// axios 全局配置
axios.defaults.baseURL = config.api;
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.withCredentials = true;
axios.defaults.responseType = 'json';

// http request 请求 全局拦截器
axios.interceptors.request.use(
  (request) => {
    // 全局参数解析

    //  qs全局解析一下请求数据
    if (request.method === 'post') request.data = qs.stringify(request.data);
    return request;
  },
  error => Promise.reject(error));

// http response 返回响应拦截器
axios.interceptors.response.use(
  response => {
    // 格式化正常返回de数据
    return response.data;
  },
  (error) => {
    // 报错也关闭loading
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 做点什么
          break;
        case 403:
          // 返回403 做点什么
          break;
        default:
          break;
      }
    }
    return Promise.reject(error);   // 返回接口返回的错误信息
  });


export default axios;

