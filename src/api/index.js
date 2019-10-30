// index.js
// import httpMock from "@/utils/httpMock.js" // 本地环境mock请求，前后端联调时请注释
import ajax from '@/utils/ajax.js'
// 引入各个模块接口
import businessCharts from './modules/businessCharts'
import businessManage from './modules/businessManage'
import businessOperation from './modules/businessOperation'
import systemManage from './modules/systemManage'


export default {
  /*
   *@param {json} options: {} || {data: json}
   */
  /* 请务必注释每个接口所属名称 */
  // 获取左侧导航
  getMenu: (options = {}) => ajax.post('/menu', options),
  // 登录
  getLogin: (options = {}) => ajax.post('/login', options),
  // 登出
  getLogOut: (options = {}) => ajax.post('/logout', options),
  // 上传范例
  testUpload: (options = {}) => ajax.upload('/game/uploading', options),
  // 覆盖默认api请求地址范例
  testApiUrl: (options = {}) => ajax.post('/test', {
    ...options,
    baseURL: '//10.6.0.89:8080/bms/api'
  }),

  ...businessCharts,
  ...businessManage,
  ...businessOperation,
  ...systemManage
}