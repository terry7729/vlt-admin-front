// index.js
import httpMock from "@/utils/httpMock.js" // 本地环境mock请求，必要时请注释
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
  // 登出
  getLoginOut: (options = {}) => ajax.post('/logout', options),

  ...businessCharts,
  ...businessManage,
  ...businessOperation,
  ...systemManage
}