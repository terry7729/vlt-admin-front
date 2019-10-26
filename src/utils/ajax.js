// ajax.js
import axios from 'axios'
import qs from 'qs'
axios.defaults.timeout = 60000;
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';

switch (process.env.VUE_APP_MODE) {
  // 生产环境
  case 'production':
    axios.defaults.baseURL = '//192.168.0.1/prod/api'
    break
    // 开发环境
  case 'development':
    axios.defaults.baseURL = '//192.168.0.1/dev/api'
    break
    // 测试环境
  case 'testing':
    axios.defaults.baseURL = '//192.168.0.1/test/api'
    break
  default:

    axios.defaults.baseURL = 'http://10.6.0.103:8080/bms/api' // 本地server环境
    // axios.defaults.baseURL = 'http://10.7.0.187:8080/bms/api/vlt' // 本地server环境 
    // axios.defaults.baseURL = 'http://10.6.0.103:8080/bms/api' // 本地server环境
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
  return (async () => {
    try {
      let res;
      if (typeof options !== 'object') {
        const id = options;
        res = await axios[method](`${url}/${id}`); /*  */
      } else {
        const data = options.data || {}
        // 上传
        if (extend === 'upload') {
          res = await axios[method](url, data, {
            // 上传进度
            onUploadProgress: (progressEvent) => {
              if (options.onUploadProgress) {
                // 监听回调
                options.onUploadProgress(progressEvent);
              }
            }
          });
          return res.data;
        }
        res = await axios[method](url, method === 'get' ? {
          params: data
        } : data);
      }
      return res.data;
    } catch (err) {
      console.warn('api请求错误：', err);
    }
  })();
}

export default {
  get(url, options) {
    return request('get', url, options);
  },
  post(url, options) {
    return request('post', url, options);
  },
  upload(url, options) {
    return request('post', url, options, 'upload');
  },
  axios
}