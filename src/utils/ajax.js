// ajax.js
import axios from "axios";
import qs from "qs";
import storage from "./storage";
import {
  Message,
  Loading
} from "element-ui";
axios.defaults.timeout = 60000;
axios.defaults.headers.common["Content-Type"] = "application/json;charset=UTF-8";

let baseURL; // 缓存默认api地址

switch (process.env.VUE_APP_MODE) {
  // 生产环境
  case "production":
    baseURL = axios.defaults.baseURL = "//192.168.0.1/prod/api";
    break;
    // 开发环境
  case "development":
    baseURL = axios.defaults.baseURL = "//192.168.0.1/dev/api";
    break;
    // 测试环境
  case "testing":
    baseURL = axios.defaults.baseURL = "//10.6.0.203:8081/bms/api";
    break;
  default:
    // axios.defaults.baseURL = 'http://10.7.0.167:8081/bms/api'
    // axios.defaults.baseURL = 'http://10.7.0.87:8081/bms/api'
    // axios.defaults.baseURL = 'http://10.7.0.49:8081/bms/api'
    // axios.defaults.baseURL = 'http://10.7.0.88:8081/bms/api'
    // axios.defaults.baseURL = 'http://10.7.0.190:8081/bms/api'
    // axios.defaults.baseURL = 'http://10.7.0.91:8081/bms/api'
    // axios.defaults.baseURL = 'http://10.7.0.89:8081/bms/api'
    axios.defaults.baseURL = 'http://10.6.0.203:8081/bms/api'
    // axios.defaults.baseURL = 'http://10.7.0.89:8081/bms/api'


}
/**
 * @description http请求
 * @param  {String} method 请求方法
 * @param  {String} url 请求路径
 * @param  {Object} options 请求配置
 * @param  {String} extend 请求拓展
 * @return {Function} result promise
 */
const request = (method, url, options, extend) => {
  // 覆盖默认api baseURL
  if (typeof options.baseURL === "string") {
    axios.defaults.baseURL = options.baseURL;
  } else {
    axios.defaults.baseURL = baseURL;
  }
  // 基本参数
  if (storage.get("token")) {
    axios.defaults.headers.common["Authorization"] = storage.get("token");
  }
  const loading = Loading.service({
    fullscreen: true,
    text: "正在加载",
    spinner: "el-icon-loading iconfont icon-loading",
    background: "rgba(0,0,0,0)",
    customClass: "gb-loading"
  });
  return (async () => {
    try {
      let res;
      const responseType = {
        responseType: options.responseType
      } || {};
      if (options.data && typeof options.data !== "object") {
        res = await axios[method](`${url}/${options.data}`); /*RESTful传参*/
      } else {
        const data = options.data || {};
        // 上传
        if (extend === "upload") {
          res = await axios[method](url, data, {
            // 上传进度
            onUploadProgress: progressEvent => {
              if (options.onUploadProgress) {
                // 监听回调
                options.onUploadProgress(progressEvent);
              }
            }
          });
        } else {
          switch (method) {
            case "get":
              res = await axios[method](url, {
                params: data,
                ...responseType
              });
              break;
            case "post":
              res = await axios[method](url, data, responseType);
              break;
            case "put":
              res = await axios[method](url, data);
              break;
            case "delete":
              res = await axios[method](url, data);
              break;
            default:
              res = await axios[method](url, data, responseType);
          }
        }
      }
      // message提示
      if (res.data && res.data.code != 0) {
        Message.closeAll();
        res.data.msg && Message.error(res.data.msg);
      } else {
        if (typeof options.message === "string") {
          Message.closeAll();
          Message.success(options.message);
        }
      }
      // 未登录
      if (res.data.code == 100) {
        location.href = "#/login";
      }
      loading.close();
      return res.data;
    } catch (err) {
      Message.closeAll();
      Message.error("接口请求错误！");
      loading.close();
    }
  })();
};

export default {
  get(url, options) {
    return request("get", url, options);
  },
  post(url, options) {
    return request("post", url, options);
  },
  upload(url, options) {
    return request("post", url, options, "upload");
  },
  put(url, options) {
    return request("put", url, options);
  },
  delete(url, options) {
    return request("delete", url, options);
  },
  axios
};