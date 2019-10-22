// ajax.js
import axios from 'axios'
import qs from 'qs'
axios.defaults.timeout = 60000;
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';

switch(process.env.VUE_APP_MODE) {
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
}

const request = (method, url, options, id) => {
  const runRequest = async () => {
    const data = options.data || {};
    // if(id) {url = `${url}/${id}`}
    
    const formatData = data;
    try {
      const res = await axios[method](url, method === 'get' ? {params: formatData} : formatData);
      return res.data;
    } catch (err) {
      console.warn('ajax-error', err);
    }
  };
  return runRequest();
}

export default {
  get (url, options) {
    return request('get', url, options);
  },
  post (url, options) {
    return request('post', url, options);
  },
  axios
}