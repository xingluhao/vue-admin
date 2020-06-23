import axios from "axios";
import { Message } from 'element-ui';

//创建axios实例，赋给变量instance
// http://www.web-jshtml.cn/productApi
const BASEURL = process.env.NODE_ENV === "production" ? "" : "/devApi"
console.log(BASEURL)
const instance = axios.create({
  baseURL: BASEURL,
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
//请求拦截器
instance.interceptors.request.use(
  function(config) {
    //拦截请求做什么
    return config;
  },
  function(error) {
    //请求错误错什么
    return Promise.reject(error);
  }
);

//响应拦截器
instance.interceptors.response.use(
  function(response) {
    //对相应数据做什么
    let data = response.data
    if (data.resCode !== 0) {
      Message.error(data.message)
      return Promise.reject(data)
    } else {
      return Promise.resolve(response);
    }
  },
  function(error) {
    //响应错误做什么

    return Promise.reject(error);
  }
);

export default instance;
