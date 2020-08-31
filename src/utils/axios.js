import axios from "axios";
import Qs from "qs";
import storage from "./cookie";
import router from '../router'
export default function (path, params, method = "get", headerType = "json", baseUrL = "/apis") {
  let baseURL = "";
  let headers = {};
  let data = {};

  baseURL = process.env.BASE_URL;

  //post请求
  if (method === "post") {
    if (headerType === "json") {
      axios.defaults.headers["Content-Type"] = "application/json;charset=UTF-8";
      data = params;
    } else {
      axios.defaults.headers["Content-Type"] =
        "application/x-www-form-urlencoded;charset=UTF-8";
      data = Qs.stringify(params);
    }
  }

  //get请求
  if (method === "get") {
    if (headerType == !"json") {
      axios.defaults.headers["Content-Type"] =
        "application/x-www-form-urlencoded;charset=UTF-8";
    }
    data = Qs.stringify(params);
    path = path + "?" + data;
    data = {};
  }

  // 请求拦截
  axios.interceptors.request.use(
    config => {
      let token = storage.getCookie("token");
      if (token) {
        config.headers["Token"] = token;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  // 当出现某些情况的时候设置请求拦截
  axios.interceptors.response.use(response => {
    if (response.data.code == 401) {
      storage.removeCookie("token");
      router.push('/')
    }
    return response;
  },
    error => {
      return Promise.reject(error);
    }
  );

  //发送请求
  return new Promise((resolve, reject) => {
    axios({
      baseURL,
      url: path,
      method,
      data: data,
      timeout: 6000,
      headers: headers
    })
      .then(result => {
        resolve(result.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}
